import { useEffect } from "react";
import Button from "@/Components/Breeze/Button";
import Checkbox from "@/Components/Breeze/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Breeze/Input";
import Label from "@/Components/Breeze/Label";
import ValidationErrors from "@/Components/Breeze/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "admin@domain.com",
    password: "password",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === "checkbox" ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <Guest>
      <Head title="Log in" />

      {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div>
          <Label forInput="email" value="Email" />

          <Input
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4">
          <Label forInput="password" value="Password" />

          <Input
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          {canResetPassword && (
            <Link href={route("password.request")} className="text-sm text-gray-600 underline hover:text-gray-900">
              Forgot your password?
            </Link>
          )}

          <Button className="ml-4" processing={processing}>
            Log in
          </Button>
        </div>
      </form>
    </Guest>
  );
}
