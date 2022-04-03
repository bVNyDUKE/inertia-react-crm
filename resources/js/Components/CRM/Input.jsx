import React from "react";

const nameFromLabel = (label) => label.toLowerCase().replace(" ", "_");

const Wrapper = ({ children, className }) => <div className={`w-full pr-6 pb-8 ${className}`}>{children}</div>;

const Error = ({ error }) => {
  if (!error) {
    return null;
  }
  return <div className="mt-2 border border-red-300 p-2 text-red-500">{error}</div>;
};

const Label = ({ label }) => (
  <label className="mb-2 block select-none text-gray-700" htmlFor={nameFromLabel(label)}>
    {label}:
  </label>
);

const Text = ({ label, error, ...rest }) => (
  <Wrapper className={"lg:w-1/2"}>
    <Label label={label} />
    <input type="text" name={nameFromLabel(label)} className="input-text" {...rest} />
    <Error error={error} />
  </Wrapper>
);

const Area = ({ label, error, ...rest }) => (
  <Wrapper>
    <Label label={label} />
    <textarea name={nameFromLabel(label)} className="input-text" rows={5} {...rest}></textarea>
    <Error error={error} />
  </Wrapper>
);

const Option = ({ key, value, title }) => (
  <option key={key} value={value} className="">
    {title}
  </option>
);

const Select = ({ label, error, options, ...rest }) => (
  <Wrapper className={"lg:w-1/2"}>
    <Label label={label} />
    <select name={nameFromLabel(label)} {...rest} className="input-text form-select">
      {options && options.map((op) => <Option key={op.id} value={op.id} title={op.name} />)}
    </select>
    <Error error={error} />
  </Wrapper>
);

export default {
  Text,
  Area,
  Select,
};
