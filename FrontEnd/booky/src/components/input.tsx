type Props = {
  type: 'email' | 'password';
  placeholder: string;
};

export function DefaultInput(props: Props) {
  return (
    <>
      <input
        id={props.type}
        alt={props.type + ' input'}
        type={props.type}
        name={props.type}
        placeholder={props.placeholder}
        required
        className="placeholder-purple-300 w-2/3 rounded-full bg-purple-100 text-4xl px-8 py-4 font-semibold align-middle text-purple-800"
      ></input>
    </>
  );
}
