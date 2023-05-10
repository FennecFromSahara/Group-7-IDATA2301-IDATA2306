import { Typography, Box } from "@mui/material";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function About() {
  return (
    <div>
      <NavBar />

      <Box minHeight="92vh" display="flex" flexDirection="column">
        <Box flex={1} overflow="auto">
          <Typography variant="h3">About us</Typography>
          <Typography variant="body1">
            <b>About us: </b>Mocha Nooka Cafe is the place to be for cool cats
            and urbanites alike. Located in the heart of the city, it's the
            go-to spot for the perfect cup of coffee or a tasty bite of food.
            Whether you're grabbing a quick espresso on the go or settling in
            for a leisurely lunch, you'll find the perfect balance of atmosphere
            and flavor. Our baristas are passionate about crafting the perfect
            cup, with a rotating selection of specialty brews, beans, and
            blends. Plus, our friendly staff is always on hand to offer up
            recommendations for the perfect pairing. Come check us out for an
            unforgettable experience.
          </Typography>
          <br />
          <Typography variant="body1">
            <b>Our values: </b>At Mocha Nooka Cafe, we strive to create a
            peaceful, modern atmosphere for our guests to enjoy. Our carefully
            crafted menu of delicious treats and beverages is designed to please
            all palates. Whether you're in the mood for something sweet, savory,
            or something in between, we have something that will tantalize your
            taste buds. Our experienced baristas are passionate about crafting
            the perfect cup, to ensure the most enjoyable coffee experience. And
            our friendly staff will always be around to provide helpful advice
            and recommendations. We believe in creating a calm, modern, and
            tasty space for our guests to enjoy.
          </Typography>
        </Box>

        <Footer />
      </Box>
    </div>
  );
}


function TestimonialProps {
    name: string;
    comment: string;
}

export default function TestimonialSection() {
    const theme = useTheme();
    const items = [
        <Testimonial
            name={'Sean (25)'}
            comment={'Mocha Nooka Cafe is my favorite spot for a chill, hip atmosphere. ' +
                'The coffee is always on point and the staff are super helpful.' +
                'A definite must-visit for anyone anyone who\'s looking for a unique cafe eprerience!'}
        />,
        <Testimonial
            name={'John (65)'}
            comment={'"I\'ve been coming to Mocha Nooka Cafe for years and it\'s never disappointed.' +
                ' The coffe is always freshy brewed and the food is always delicious.' +
                'It\'s a great spot for a quick\n' +
                'break, or a leisurely chat with friends.'}

        />,
        <Testimonial
            name={'Toni (16)'}
            comment={'"I love coming to Mocha Nooka Cafe!' +
                ' It\'s the perfect spot to hang out with friends and enjoy something tasty and refreshing.' +
                'The atmosphere is always chill and the staff are really friendly. Highly recommended!" '}
        />
    ];


export default About;
