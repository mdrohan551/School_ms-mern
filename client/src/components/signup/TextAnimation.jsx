import { TypeAnimation } from 'react-type-animation';

const TextAnimation = ({text_one, text_two, text_three, text_four, text_five, text_six}) => {
    return (
      <TypeAnimation
        sequence={[
          text_one, 
          () => new Promise((resolve) => setTimeout(resolve, 2000)), // Wait 2s
          text_two, 
          () => new Promise((resolve) => setTimeout(resolve, 2000)), // Wait 2s
          text_three, 
          () => new Promise((resolve) => setTimeout(resolve, 2000)), // Wait 2s
          text_four, 
          () => new Promise((resolve) => setTimeout(resolve, 2000)), // Wait 2s
          text_five, 
          () => new Promise((resolve) => setTimeout(resolve, 2000)), // Wait 2s
          text_six, 
          () => new Promise((resolve) => setTimeout(resolve, 2000)), // Wait 2s
        ]}
        wrapper="span"
        keyStrokeDelayInMs={30}  // Smooth typing speed
        deletionSpeed={10}       // Smooth deletion
        cursor={false}            // Show cursor for realistic effect
        speed={15}              // Adjust typing speed
        style={{ fontSize: '16px', display: 'inline-block', fontWeight: "bold", marginLeft: "5px"}}
        repeat={Infinity} // Infinite loop
      />

    
    );
};

export default TextAnimation;