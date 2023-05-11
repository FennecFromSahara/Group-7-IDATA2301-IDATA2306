import Testimonial from "./Testimonial";

function TestimonialSection() {
  const testimonials = [
    <Testimonial
      name={"Sean (25)"}
      comment={
        "Mocha Nooka Cafe is my favorite spot for a chill, hip atmosphere. " +
        "The coffee is always on point and the staff are super helpful. " +
        "A definite must-visit for anyone who's looking for a unique cafe experience!"
      }
    />,
    <Testimonial
      name={"Toni (16)"}
      comment={
        "I love coming to Mocha Nooka Cafe! " +
        "It's the perfect spot to hang out with friends and enjoy something tasty and refreshing. " +
        "The atmosphere is always chill and the staff are really friendly. Highly recommended!"
      }
    />,
  ];

  return <div>{testimonials}</div>;
}

export default TestimonialSection;
