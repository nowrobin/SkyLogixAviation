'use client'

type PlaneDetails = {
  images: string[],
  descriptions: string[],
}


export default function PlaneItems({ images, descriptions: desc }: PlaneDetails) {

  return (
    <div className="flex flex-row">
      <section>
        {images[0]}
      </section>
      <article>
        {/* <title>N49202</title>
        <div>1978 Cessna 152</div>
        <div>Lycoming O-235-L2C (115HP)</div>
        <div>Flight Rule: IFR</div>
        <div>Price:$120 /hr (Wet)</div> */}
        <title>{desc[0]}</title>
        <div>{desc[1]}</div>
        <div>{desc[2]}</div>
        <div>{desc[3]}</div>
        <div>{desc[4]}</div>
      </article >
    </div >
  )
}