"use client";

import { useState, useEffect, use } from "react"; // Import `use`
import { useRouter } from "next/navigation";
import { API_KEY, API_NODE_URL } from "../../../../../config/config";

const EditAccommodation = ({ params }) => {
  const router = useRouter();
  const unwrappedParams = use(params); // Unwrap `params` using `use`
  const id = unwrappedParams.id; // Now safely access `id`

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: {
      short_description: "",
      long_description: "",
    },
    parentId: "",
    pricing: {
      currency: "",
      duration: 0,
      maxPrice: 0,
      minPrice: 0,
      minDeposit: 0,
      maxAvailablePrice: 0,
      refundable: false,
    },
    amenities: [],
    meta: {
      facts: [],
      types: [],
      payment: false,
      ranking: 0,
      croTags: [],
      maxArea: 0,
      minArea: 0,
      mAreaCount: 0,
      distance: 0,
      loginUrl: "",
      unitType: "",
      metaTitle: "",
      unitCount: 0,
      unitTypes: [],
      isInternal: false,
      isPartnered: false,
      paymentType: "",
      priceTrends: {
        trends: [],
        avgRegionPricing: 0,
        forecastingPercentChange: 0,
        increasePricePercentChange: 0,
        inventoryCostPercentChange: 0,
      },
      metaKeywords: [],
      sortPriority: 0,
      dualOccupancy: false,
      reviewSummary: {
        rating: {
          staff: 0,
          social: 0,
          cleaning: 0,
          location: 0,
          amenities: 0,
          valueForMoney: 0,
        },
        summary: "",
      },
      availableType: [],
      communityFacts: {
        inc: "",
      },
      isSeoOptimised: false,
      metaDescription: "",
      maxBedroomCount: 0,
      minBedroomCount: 0,
      guarantorRequired: false,
      maxAvailableFrom: "",
      minBathroomCount: 0,
      minLeaseDuration: 0,
      totalVideosCount: 0,
      featuredImagePath: "",
      leaseDurationUnit: "",
      isAutoSynced: false,
      yearOfConstruction: 0,
      averagePropertyPrice: 0,
      isBooking: false,
      apiEnable: false,
      lastMonthLeadsCount: 0,
      images: [],
      videos: [],
    },
    location: {
      city: "",
      route: "",
      state: "",
      country: "",
      district: "",
      locality: "",
      secondary: "",
      postalCode: "",
      streetNumber: "",
      latitude: 0,
      longitude: 0,
      city_img: [],
      features: [],
    },
    tags: [],
    featureTags: [],
    reviewsCount: 0,
    reviewsRating: 0,
    destinationDistance: 0,
    status: true,
    deleteflag: false,
    sourceLink: "",
  });

  useEffect(() => {
    if (!id) return; // Prevent fetching with an undefined id

    const fetchAccommodation = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}accommodation/accommodations/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (result.status && result.data) {
          setFormData(result.data);
        } else {
          console.error("Unexpected response format:", result);
          setFormData({
            name: "",
            type: "",
            description: { short_description: "", long_description: "" },
            // Initialize other fields as needed
          });
        }
      } catch (error) {
        console.error("Error fetching accommodation data:", error);
        setFormData({
          name: "",
          type: "",
          description: { short_description: "", long_description: "" },
          // Initialize other fields as needed
        });
      }
    };

    fetchAccommodation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("description")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          [key]: value,
        },
      });
    } else if (name.includes("pricing")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        pricing: {
          ...formData.pricing,
          [key]: value,
        },
      });
    } else if (name.includes("meta")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        meta: {
          ...formData.meta,
          [key]: value,
        },
      });
    } else if (name.includes("location")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [key]: value,
        },
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      console.error("Error: ID is missing");
      return;
    }

    try {
      const response = await fetch(`${API_NODE_URL}accommodation/accommodations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Accommodation updated successfully!");
        router.push("/admin/list-of-accommodations");
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating accommodation:", error);
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4 text-start px-4">Edit Accommodation</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-4 space-y-4 w-full"
      >
        {/* Accommodation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Accommodation Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter Accommodation name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type || ""}
              onChange={(e) => {
                const selectedType = e.target.value;
                if (["Hostel", "PG", "Apartment"].includes(selectedType)) {
                  setFormData((prevData) => ({ ...prevData, type: selectedType }));
                }
              }}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              required
            >
              <option value="">Select Type</option>
              <option value="Hostel">Hostel</option>
              <option value="PG">PG</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Short Description</label>
          <textarea
            name="description.short_description"
            value={formData.description.short_description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            placeholder="Enter short description"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Long Description</label>
          <textarea
            name="description.long_description"
            value={formData.description.long_description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            placeholder="Enter long description"
            required
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Currency</label>
            <input
              type="text"
              name="pricing.currency"
              value={formData.pricing.currency}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter currency"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Duration</label>
            <input
              type="number"
              name="pricing.duration"
              value={formData.pricing.duration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter duration"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Max Price</label>
            <input
              type="number"
              name="pricing.maxPrice"
              value={formData.pricing.maxPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter max price"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Min Price</label>
            <input
              type="number"
              name="pricing.minPrice"
              value={formData.pricing.minPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter min price"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Min Deposit</label>
            <input
              type="number"
              name="pricing.minDeposit"
              value={formData.pricing.minDeposit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter min deposit"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Max Available Price</label>
            <input
              type="number"
              name="pricing.maxAvailablePrice"
              value={formData.pricing.maxAvailablePrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter max available price"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Refundable</label>
            <input
              type="checkbox"
              name="pricing.refundable"
              checked={formData.pricing.refundable}
              onChange={handleChange}
              className="p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">City</label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter city"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">District</label>
            <input
              type="text"
              name="location.district"
              value={formData.location.district}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter district"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">State</label>
            <input
              type="text"
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter state"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter country"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              name="location.postalCode"
              value={formData.location.postalCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter postal code"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Route</label>
            <input
              type="text"
              name="location.route"
              value={formData.location.route}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter route"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Locality</label>
            <input
              type="text"
              name="location.locality"
              value={formData.location.locality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter locality"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Secondary</label>
            <input
              type="text"
              name="location.secondary"
              value={formData.location.secondary}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter secondary"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Street Number</label>
            <input
              type="text"
              name="location.streetNumber"
              value={formData.location.streetNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter street number"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter latitude"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter longitude"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">City Image</label>
            <input
              type="text"
              name="location.city_img"
              value={formData.location.city_img}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter city image"
              required
            />
          </div>
        </div>

        {/* Feature Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Tag</label>
            <input
              type="text"
              name="featureTags.tag"
              value={formData.featureTags.tag}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter tag"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="featureTags.name"
              value={formData.featureTags.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Value</label>
            <input
              type="text"
              name="featureTags.value"
              value={formData.featureTags.value}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter value"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Short Text</label>
            <input
              type="text"
              name="featureTags.shortText"
              value={formData.featureTags.shortText}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter short text"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              name="featureTags.displayName"
              value={formData.featureTags.displayName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter display name"
              required
            />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Amenities</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities.join(", ")}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                amenities: e.target.value.split(",").map((a) => a.trim()),
              }));
            }}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            placeholder="Enter amenities (comma separated)"
          />
        </div>

        {/* Meta Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Facts</label>
            {formData.meta.facts.map((fact, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder="Fact Name"
                  value={fact.name}
                  onChange={(e) => {
                    const updatedFacts = [...formData.meta.facts];
                    updatedFacts[index].name = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      meta: { ...prevData.meta, facts: updatedFacts },
                    }));
                  }}
                  className="w-1/3 p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={fact.value}
                  onChange={(e) => {
                    const updatedFacts = [...formData.meta.facts];
                    updatedFacts[index].value = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      meta: { ...prevData.meta, facts: updatedFacts },
                    }));
                  }}
                  className="w-1/3 p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300"
                />
                <input
                  type="number"
                  placeholder="Count"
                  value={fact.count}
                  onChange={(e) => {
                    const updatedFacts = [...formData.meta.facts];
                    updatedFacts[index].count = Number(e.target.value);
                    setFormData((prevData) => ({
                      ...prevData,
                      meta: { ...prevData.meta, facts: updatedFacts },
                    }));
                  }}
                  className="w-1/3 p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedFacts = formData.meta.facts.filter((_, i) => i !== index);
                    setFormData((prevData) => ({
                      ...prevData,
                      meta: { ...prevData.meta, facts: updatedFacts },
                    }));
                  }}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    meta: { ...prevData.meta, facts: [...prevData.meta.facts, { name: "", value: "", count: 0 }] },
                  }))
                }
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Add Fact
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Types</label>
            <input
              type="text"
              name="meta.types"
              value={formData.meta.types.join(", ")}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  meta: { ...prevData.meta, types: e.target.value.split(",").map((t) => t.trim()) },
                }));
              }}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter types (comma separated)"
            />
          </div>
        </div>
        {/* Meta Images */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Images</label>
          {formData.meta.images.map((image, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => {
                  const updatedImages = [...formData.meta.images];
                  updatedImages[index] = e.target.value;
                  setFormData((prevData) => ({
                    ...prevData,
                    meta: { ...prevData.meta, images: updatedImages },
                  }));
                }}
                className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => {
                  const updatedImages = formData.meta.images.filter((_, i) => i !== index);
                  setFormData((prevData) => ({
                    ...prevData,
                    meta: { ...prevData.meta, images: updatedImages },
                  }));
                }}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  meta: { ...prevData.meta, images: [...prevData.meta.images, ""] },
                }))
              }
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Add Image
            </button>
          </div>
        </div>

        {/* Meta Videos */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Videos</label>
          {formData.meta.videos.map((video, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Video URL"
                value={video}
                onChange={(e) => {
                  const updatedVideos = [...formData.meta.videos];
                  updatedVideos[index] = e.target.value;
                  setFormData((prevData) => ({
                    ...prevData,
                    meta: { ...prevData.meta, videos: updatedVideos },
                  }));
                }}
                className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => {
                  const updatedVideos = formData.meta.videos.filter((_, i) => i !== index);
                  setFormData((prevData) => ({
                    ...prevData,
                    meta: { ...prevData.meta, videos: updatedVideos },
                  }));
                }}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  meta: { ...prevData.meta, videos: [...prevData.meta.videos, ""] },
                }))
              }
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Add Video
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1c2333] hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded shadow-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccommodation;