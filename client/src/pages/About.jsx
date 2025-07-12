const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center transition-all duration-500 ease-in-out bg-gradient-to-b from-indigo-50 to-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-purple-700 transition-transform duration-500 hover:scale-105 inline-block">
        About Us
      </h1>
      <p className="text-gray-800 text-lg leading-relaxed mb-8 font-medium transition-transform duration-500 hover:scale-105 inline-block">
        Welcome to our platform! We are committed to providing quality products
        and services. This About Us page is here to give you insight into our
        mission, team, and goals.
      </p>
      <div className="mt-6 p-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl shadow-md transition-transform duration-500 hover:scale-105 inline-block">
        <h2 className="text-2xl font-bold mb-3 text-purple-800">Our Mission</h2>
        <p className="text-gray-700 font-medium">
          To empower customers with the best online shopping experience through
          quality products and excellent service.
        </p>
      </div>
    </div>
  );
};

export default About;
