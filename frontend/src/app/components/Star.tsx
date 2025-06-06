import Image from 'next/image';

type Props = {
  index: number;
  width: number;
  rating: number;
  setRating: Function;
  handleRatingClick: Function;
};

export default function Star(props: Props) {
  const handleRatingClick = async () => {
    const rating = (props.index + 1) / 2;
    await props.setRating(rating);
    props.handleRatingClick(rating);
  };

  return (
    <>
      <button onClick={() => handleRatingClick()}>
        <Image
          className="opacity-75 hover:opacity-100 active:scale-125 active:opacity-100"
          src={`/star_${props.index % 2}${props.index < props.rating * 2 ? 1 : 0}.png`}
          alt=""
          width={props.width / 2}
          height={props.width}
        />
      </button>
    </>
  );
}
