"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { API_NODE_URL, API_KEY } from "../../config/config"

const PopularColleges = () => {
  const [colleges, setColleges] = useState([])
  const [cities, setCities] = useState([])
  const [activeCity, setActiveCity] = useState("All")
  const scrollRef = useRef(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}popularCollege/colleges`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        })

        const text = await response.text() // Read raw response

        const data = JSON.parse(text) // Parse JSON manually

        if (Array.isArray(data.colleges)) {
          setColleges(data.colleges)

          const uniqueCities = ["All", ...new Set(data.colleges.map((college) => college.city))]
          setCities(uniqueCities)
        } else {
          console.error("Unexpected API response structure:", data)
        }
      } catch (error) {
        console.error("Error fetching colleges:", error)
      }
    }

    fetchColleges()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowLeftButton(scrollRef.current.scrollLeft > 0)
        setShowRightButton(scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth)
      }
    }
    handleScroll()
    scrollRef.current?.addEventListener("scroll", handleScroll)
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll)
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 170
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
    }
  }

  const filteredColleges = activeCity === "All" ? colleges : colleges.filter((college) => college.city === activeCity)

  const firstRowCount = Math.min(9, Math.ceil(filteredColleges.length / 2))
  const firstRow = filteredColleges.slice(0, firstRowCount)
  const secondRow = filteredColleges.slice(firstRowCount)

  return (
    <div className="max-w-[1500px] mx-auto lg:mx-12 2xl:mx-auto py-6 px-6 my-10 relative">
      <h2 className="text-2xl font-bold mb-2">Popular Colleges/Universities Across India</h2>
      <p className="text-gray-600">
        Top Cities, Best Colleges – <span className="font-semibold">Your Stay, Sorted</span>!
      </p>

      {/* City Tabs */}
      <div className="flex gap-3 overflow-x-auto mt-8 max-w-7xl">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-4 py-2 border rounded-2xl md:rounded-full transition-all text-sm md:text-base ${
              activeCity === city ? "border-[#5e23dd] bg-[#5e23dd] text-white" : "border-gray-300"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Scrollable Colleges Section */}
      <div className="mt-6 relative">
        {showLeftButton && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-red-500 hover:text-white transition"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div ref={scrollRef} className="overflow-x-auto scroll-smooth w-full px-0 relative no-scrollbar">
          <div className="flex flex-col gap-4 w-max">
            {/* First Row */}
            <div className="flex gap-4">
              {firstRow.map((college) => (
                <div
                  key={college._id}
                  className="relative w-40 h-48 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[14rem] rounded-lg overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110 bg-gray-400 bg-blend-darken"
                    style={{ backgroundImage: `url(${college.img[0]})` }}
                  ></div>
                  <div className="absolute flex items-end p-2 bottom-0">
                    <p className="text-white font-bold mx-auto line-clamp-1 overflow-hidden">{college.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row */}
            <div className="flex gap-4">
              {secondRow.map((college) => (
                <div
                  key={college._id}
                  className="relative w-40 h-48 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[14rem] rounded-lg overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110 bg-gray-400 bg-blend-darken"
                    style={{ backgroundImage: `url(${college.img[0]})` }}
                  ></div>
                  <div className="absolute flex items-end p-2 bottom-0">
                    <p className="text-white font-bold mx-auto line-clamp-1 overflow-hidden">{college.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showRightButton && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-red-500 hover:text-white transition"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  )
}

export default PopularColleges