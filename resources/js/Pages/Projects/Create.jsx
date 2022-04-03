import React from "react";

import { useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import PageTitle from "@/Components/PageTitle";
import Input from "@/Components/Input";
import CrumbsLink from "@/Components/CrumbsLink";

function CreateProject({ clients, users }) {
  const form = useForm({
    title: "",
    user: "",
    client: "",
    description: "",
  });

  console.log(form.errors);

  const handleInputChange = (e) => {
    if (form.data[e.target.name] !== e.target.value) {
      form.clearErrors(e.target.name);
    }
    form.setData(e.target.name, e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    form.post(route("projects.store"));
  };

  return (
    <>
      <PageTitle>
        <CrumbsLink routeName={"projects.index"} backLink="Projects" pageName="Create" />
      </PageTitle>
      <div className="max-w-3xl overflow-hidden rounded-md bg-white shadow">
        <form onSubmit={submit}>
          <div className="-mb-8 -mr-6 flex flex-wrap items-center p-8">
            <Input.Text label={"Title"} error={form.errors.title} onChange={handleInputChange} />
            <div className="lg:w-1/2">{""}</div>
            <Input.Select label={"Client"} name={"client_id"} error={form.errors.client_id} onChange={handleInputChange}>
              <option selected></option>
              {clients &&
                clients.map((client) => (
                  <Input.Option key={client.id} value={client.id}>
                    {client.company}{" "}
                  </Input.Option>
                ))}
            </Input.Select>
            <Input.Select label={"User"} name={"user_id"} error={form.errors.user_id} onChange={handleInputChange}>
              <option selected></option>
              {users &&
                users.map((user) => (
                  <Input.Option key={user.id} value={user.id}>
                    {user.name}{" "}
                  </Input.Option>
                ))}
            </Input.Select>
            <Input.Area label={"Description"} error={form.errors.description} onBlur={handleInputChange} />
          </div>
          <div className="mt-5 flex items-center justify-end border-t border-gray-100 bg-gray-50 px-8 py-4">
            <button className="btn-indigo">Create Project</button>
          </div>
        </form>
      </div>
    </>
  );
}

CreateProject.layout = (page) => <Authenticated title="Projects">{page}</Authenticated>;

export default CreateProject;
