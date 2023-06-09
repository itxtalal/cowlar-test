import { FC, ChangeEvent } from 'react';

type Props = {
  todo: string;
  error: string;
  isLoading: boolean;
  title: string;
  errorPlaceholder: string;
  placeholder: string;
  id: string;
  type: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({
  todo,
  error,
  isLoading,
  changeHandler,
  title,
  errorPlaceholder,
  placeholder,
  id,
  type = 'text',
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className="mb-2 text-xl md:text-2xl xl:text-3xl font-medium text-white"
      >
        {title}
      </label>
      <input
        type={type}
        id={id}
        value={todo}
        disabled={isLoading}
        onChange={changeHandler}
        className={`bg-[#edece7] border text-md xl:text-lg rounded-lg block w-full px-4 py-3 ${
          error
            ? ' border-red-500 text-red-700 placeholder-red-700 focus:ring-red-500  focus:border-red-500'
            : ''
        }`}
        placeholder={error ? errorPlaceholder : placeholder}
      />
      {error ? (
        <p className="mt-2 text-base text-red-500 ">
          <span className="font-medium">Oh, snapp!</span> {error}
        </p>
      ) : null}
    </>
  );
};

export default Input;
