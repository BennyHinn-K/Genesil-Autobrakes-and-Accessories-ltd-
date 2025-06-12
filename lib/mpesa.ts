interface MpesaConfig {
  consumerKey: string
  consumerSecret: string
  businessShortCode: string
  passkey: string
  callbackUrl: string
  environment: "sandbox" | "production"
  receiverNumber: string
}

interface STKPushRequest {
  phoneNumber: string
  amount: number
  accountReference: string
  transactionDesc: string
}

interface STKPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

class MpesaService {
  private config: MpesaConfig
  private baseUrl: string

  constructor() {
    this.config = {
      consumerKey: process.env.MPESA_CONSUMER_KEY || "",
      consumerSecret: process.env.MPESA_CONSUMER_SECRET || "",
      businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE || "174379",
      passkey: process.env.MPESA_PASSKEY || "",
      callbackUrl: process.env.MPESA_CALLBACK_URL || "",
      environment: (process.env.MPESA_ENVIRONMENT as "sandbox" | "production") || "sandbox",
      receiverNumber: "+254722683434", // The number payments are made to
    }

    this.baseUrl =
      this.config.environment === "sandbox" ? "https://sandbox.safaricom.co.ke" : "https://api.safaricom.co.ke"
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString("base64")

    const response = await fetch(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    return data.access_token
  }

  private generateTimestamp(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hour = String(now.getHours()).padStart(2, "0")
    const minute = String(now.getMinutes()).padStart(2, "0")
    const second = String(now.getSeconds()).padStart(2, "0")

    return `${year}${month}${day}${hour}${minute}${second}`
  }

  private generatePassword(): string {
    const timestamp = this.generateTimestamp()
    const password = Buffer.from(`${this.config.businessShortCode}${this.config.passkey}${timestamp}`).toString(
      "base64",
    )
    return password
  }

  async initiateSTKPush(request: STKPushRequest): Promise<STKPushResponse> {
    try {
      const accessToken = await this.getAccessToken()
      const timestamp = this.generateTimestamp()
      const password = this.generatePassword()

      // Validate phone number format
      let phoneNumber = request.phoneNumber.replace(/\D/g, "")
      if (phoneNumber.startsWith("0")) {
        phoneNumber = "254" + phoneNumber.substring(1)
      } else if (!phoneNumber.startsWith("254")) {
        phoneNumber = "254" + phoneNumber
      }

      // Validate phone number length
      if (phoneNumber.length !== 12) {
        throw new Error("Invalid phone number format")
      }

      const stkPushData = {
        BusinessShortCode: this.config.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(request.amount),
        PartyA: phoneNumber,
        PartyB: this.config.businessShortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: this.config.callbackUrl,
        AccountReference: request.accountReference,
        TransactionDesc: request.transactionDesc,
      }

      const response = await fetch(`${this.baseUrl}/mpesa/stkpush/v1/processrequest`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stkPushData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("STK Push error:", error)
      throw error
    }
  }

  async querySTKPushStatus(checkoutRequestId: string): Promise<any> {
    const accessToken = await this.getAccessToken()
    const timestamp = this.generateTimestamp()
    const password = this.generatePassword()

    const queryData = {
      BusinessShortCode: this.config.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }

    const response = await fetch(`${this.baseUrl}/mpesa/stkpushquery/v1/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryData),
    })

    const data = await response.json()
    return data
  }
}

export const mpesaService = new MpesaService()
