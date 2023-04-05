import Slider from "./Slider"

export default function navbar() {
  return (
    <div>
        <div className="fixed w-full h-16 bg-gray-900 text-white flex justify-between items-center">
            <Slider />
                <div className="flex justify-end items-center h-full px-8">
                    <h1>Flickz</h1>
                </div>
        </div>
    </div>
  )
}
