import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Table from "@/Components/Table";
import PageTitle from "@/Components/PageTitle";

function StatusMenu({ statuses, project }) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({ status: project.status });

  //TODO TRY A SIMPLE FETCH API CALL

  function handleInputChange(e) {
    console.log(e.target.value);
    form.setData((v) => ({ ...v, status: e.target.value }));
    console.log(form);
    form.patch(route("projects.update", project.id));
    setIsOpen(false);
  }

  return (
    <div className="relative" onClick={() => !isOpen && setIsOpen(true)}>
      {!isOpen && <div>{project.status}</div>}
      {isOpen && (
        <div className="w-full">
          <select defaultValue={project.status} onChange={handleInputChange}>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

const ProjectsIndex = ({ projects, statuses }) => {
  return (
    <>
      <Head title="Projects" />
      <PageTitle>Projects</PageTitle>
      <div className="mb-4 flex items-center justify-between ">
        <div>Placeholder</div>
        <Link as={"button"} className="btn-indigo" href={route("projects.create")}>
          Create Project
        </Link>
      </div>

      <Table.Main paginator={projects}>
        <Table.Head>
          <Table.Th>Title</Table.Th>
          <Table.Th>User</Table.Th>
          <Table.Th>Client</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th></Table.Th>
        </Table.Head>
        <Table.Body>
          {projects.data.map((project) => {
            let href = route("projects.edit", project.id);
            return (
              <Table.Row key={project.id}>
                <Table.LinkCell className="w-1/3" href={href}>
                  {project.title}
                </Table.LinkCell>
                <Table.LinkCell href={href}>{project.client.company}</Table.LinkCell>
                <Table.LinkCell href={href}>{project.user.name}</Table.LinkCell>
                <Table.Cell className="w-10 text-center">
                  <StatusMenu project={project} statuses={statuses} />
                </Table.Cell>
                <Table.Cell className="w-1/6 pr-5 text-right"></Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Main>
    </>
  );
};

export default ProjectsIndex;
