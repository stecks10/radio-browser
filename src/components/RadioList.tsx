import RadioItem from "./RadioItem";

interface RadioListProps {
  radios: { name: string; description: string }[];
}

const RadioList = ({ radios }: RadioListProps) => {
  return (
    <div className="space-y-4">
      {radios.map((radio, index) => (
        <RadioItem
          key={index}
          name={radio.name}
          description={radio.description}
        />
      ))}
    </div>
  );
};

export default RadioList;
