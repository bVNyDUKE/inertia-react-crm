import React from "react";

import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import ValidationErrors from "@/Components/Breeze/ValidationErrors";
import Input from "@/Components/Breeze/Input";
import Label from "@/Components/Breeze/Label";
import Button from "@/Components/CRM/Button";

function CreateProject({ auth, errors }) {
  const form = useForm({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    form.setData(e.target.name, e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <Authenticated
      auth={auth}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          <Link className="text-indigo-400 hover:text-indigo-600" href={route("projects.index")}>
            Projects
          </Link>
          <span className="text-indigo-400 font-medium">/</span> Create
        </h2>
      }
    >
      <div className="p-8 lg:px-14 max-w-screen-2xl mx-auto">
        <Head title="Create Contact" />
        <div className="max-w-3xl bg-white rounded-md shadow overflow-hidden">
          <form onSubmit={submit}>
            <div className="flex flex-wrap -mb-8 -mr-6 p-8 space-x-2 items-center">
              <ValidationErrors errors={errors} />
              <Label forInput="title">Project Title</Label>
              <Input name="title" value={form.data.title} required={true} handleChange={handleInputChange} className="w-full" />
            </div>
            <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100 mt-5">
              <Button label="Create Project" />
            </div>
          </form>
        </div>
      </div>
    </Authenticated>
  );
}

export default CreateProject;
