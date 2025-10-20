export function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">About X-Zen Sports</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Founded with a passion for martial arts excellence, X-Zen Sports has been transforming lives through
            disciplined training and expert instruction. Our state-of-the-art facility provides a welcoming environment
            for students of all ages and skill levels.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <p className="text-gray-600">Expert Instructors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
