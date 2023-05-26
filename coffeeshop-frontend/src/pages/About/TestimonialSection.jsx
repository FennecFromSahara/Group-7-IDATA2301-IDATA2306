import Testimonial from "./Testimonial";
import React from "react";

function TestimonialSection() {
  const testimonials = [
    {
      name: "Sean (25)",
      comment:
        "Mocha Nooka Cafe is my favorite spot for a chill, hip atmosphere. The coffee is always on point and the staff are super helpful. A definite must-visit for anyone who's looking for a unique cafe experience!",
    },
    {
      name: "Toni (16)",
      comment:
        "I love coming to Mocha Nooka Cafe! It's the perfect spot to hang out with friends and enjoy something tasty and refreshing. The atmosphere is always chill and the staff are really friendly. Highly recommended!",
    },
    {
      name: "John F. Kennedy (dead)",
      comment:
        "Mocha Nooka Cafe is a beacon of warmth and taste in the hustle and bustle of the city. Their coffee, true to its origin, offers a rich, complex flavor that seems to encapsulate the spirit of togetherness and community. The staff, too, are exceptional - knowledgeable, friendly, always eager to suggest a new blend to try. It's a place where you can feel at home while experiencing a cup of coffee that's far from ordinary. In times of change and challenge, Mocha Nooka Cafe is a testament to what passion, commitment, and a good cup of coffee can achieve.",
    },
  ].map((testimonial, index) => (
    <Testimonial
      key={index}
      name={testimonial.name}
      comment={testimonial.comment}
    />
  ));

  return <div>{testimonials}</div>;
}

export default TestimonialSection;
