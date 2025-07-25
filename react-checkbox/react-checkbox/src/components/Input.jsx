function Checkbox({
  checked,
  disable,
  onChange,
  name,
  id,
  item,
  labelClassName,
  inputClassName,
}) {
  return (
    <>
      <label className={labelClassName} htmlFor="parent">
        {item}
      </label>
      <input
        className={inputClassName}
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        disabled={disable}
        onChange={onChange}
      />
    </>
  );
}

export default Checkbox;
