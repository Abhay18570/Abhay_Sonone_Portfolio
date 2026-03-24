const floatingImageModules = import.meta.glob('../floating_images/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default',
})

const floatingImages = Object.entries(floatingImageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, src]) => src)

const positions = [
  { top: '8%', left: '6%' },
  { top: '14%', right: '10%' },
  { top: '28%', left: '18%' },
  { top: '34%', right: '18%' },
  { top: '50%', left: '4%' },
  { top: '56%', right: '8%' },
  { top: '68%', left: '16%' },
  { top: '72%', right: '16%' },
  { top: '20%', left: '42%' },
  { top: '62%', left: '38%' },
  { top: '10%', left: '70%' },
  { top: '78%', left: '58%' },
]

const shapeClasses = [
  'asteroid-shape-a',
  'asteroid-shape-b',
  'asteroid-shape-c',
  'asteroid-shape-d',
]

function FloatingImages() {
  return (
    <div className="floating-images" aria-hidden="true">
      {floatingImages.map((src, index) => (
        <div
          key={src}
          className={`floating-image-item ${shapeClasses[index % shapeClasses.length]}`}
          style={{
            ...positions[index % positions.length],
            animationDelay: `${index * 0.7}s`,
            animationDuration: `${12 + (index % 4) * 2}s`,
          }}
        >
          <span className="floating-image-shell" />
          <span className="floating-image-crater crater-one" />
          <span className="floating-image-crater crater-two" />
          <img src={src} alt="" className="floating-image" />
        </div>
      ))}
    </div>
  )
}

export default FloatingImages
