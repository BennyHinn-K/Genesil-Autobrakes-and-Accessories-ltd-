import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const caseStudies = [
  {
    title: "Enterprise Digital Transformation",
    client: "Global Manufacturing Corp",
    description:
      "How Genesil helped a leading manufacturer modernize their operations and achieve a 60% reduction in processing time.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Manufacturing", "Digital Transformation", "Process Optimization"],
    results: ["60% reduction in processing time", "35% cost savings", "Improved employee satisfaction"],
  },
  {
    title: "Cloud Migration & Security Enhancement",
    client: "Financial Services Provider",
    description:
      "A comprehensive cloud migration strategy that improved security posture while maintaining regulatory compliance.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Finance", "Cloud Migration", "Security"],
    results: ["99.99% uptime achieved", "Zero security incidents", "40% infrastructure cost reduction"],
  },
  {
    title: "E-commerce Platform Scalability",
    client: "Retail Chain Expansion",
    description:
      "Scaling an e-commerce platform to handle 10x growth during peak shopping seasons without performance degradation.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Retail", "E-commerce", "Scalability"],
    results: ["10x traffic handled seamlessly", "3.2s to 0.8s page load improvement", "28% increase in conversions"],
  },
]

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore how we've helped businesses across industries achieve remarkable results.
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <img src={study.image || "/placeholder.svg"} alt={study.title} className="w-full h-64 object-cover" />
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-blue-600">{study.client}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{study.title}</h3>
                  <p className="text-gray-600">{study.description}</p>

                  <div className="flex flex-wrap gap-2 my-4">
                    {study.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Results:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex}>{result}</li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="mt-4">
                    Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
