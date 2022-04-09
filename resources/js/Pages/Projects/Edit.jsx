import { useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import PageTitle from "@/Components/PageTitle";
import Input from "@/Components/Input";
import CrumbsLink from "@/Components/CrumbsLink";
import { capitalize } from "lodash";

function EditProject({ project, clients, users, statuses }) {
  const form = useForm(project);

  const handleInputChange = (e) => {
    if (form.data[e.target.name] !== e.target.value) {
      form.clearErrors(e.target.name);
    }
    form.setData(e.target.name, e.target.value);
  };

  const updateProject = (e) => {
    e.preventDefault();
    form.patch(route("projects.update", project.id));
  };

  const deleteProject = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete the project?")) {
      form.delete(route("projects.destroy", project.id));
    }
  };

  return (
    <>
      <PageTitle>
        <CrumbsLink routeName={"projects.index"} backLink="Projects" pageName="Edit" />
      </PageTitle>
      <div className="max-w-3xl overflow-hidden rounded-md bg-white shadow">
        <form onSubmit={updateProject}>
          <div className="-mb-8 -mr-6 flex flex-wrap items-center p-8">
            <Input.Text defaultValue={form.data.title} label="Title" error={form.errors.title} onChange={handleInputChange} />
            <Input.Select defaultValue={form.data.status} label="Status" errors={form.errors.status} onChange={handleInputChange}>
              {statuses.map((status, index) => (
                <Input.Option key={index} value={status}>
                  {capitalize(status)}
                </Input.Option>
              ))}
            </Input.Select>
            <Input.Select
              defaultValue={form.data.client_id}
              label={"Client"}
              name={"client_id"}
              error={form.errors.client_id}
              onChange={handleInputChange}
            >
              {clients &&
                clients.map((client) => (
                  <Input.Option key={client.id} value={client.id}>
                    {client.company}{" "}
                  </Input.Option>
                ))}
            </Input.Select>
            <Input.Select defaultValue={form.data.user_id} label={"User"} name={"user_id"} error={form.errors.user_id} onChange={handleInputChange}>
              {users &&
                users.map((user) => (
                  <Input.Option key={user.id} value={user.id}>
                    {user.name}{" "}
                  </Input.Option>
                ))}
            </Input.Select>
            <Input.Area defaultValue={form.data.description} label={"Description"} error={form.errors.description} onBlur={handleInputChange} />
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-gray-100 bg-gray-50 px-8 py-4">
            <button onClick={deleteProject} className="border border-red-200 p-2 text-sm text-red-500">
              Delete
            </button>
            <button disabled={!form.isDirty} className="btn-indigo">
              Update Project
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

EditProject.layout = (page) => <Authenticated title="Projects">{page}</Authenticated>;

export default EditProject;
