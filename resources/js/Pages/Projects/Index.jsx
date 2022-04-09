import { Link } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";
import PageTitle from "@/Components/PageTitle";
import Message from "@/Components/Message";

const ProjectsIndex = ({ projects, message }) => {
  return (
    <>
      <PageTitle>Projects</PageTitle>
      <Message message={message} />
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
                <Table.LinkCell className="w-10 text-center" href={href}>
                  {project.status}
                </Table.LinkCell>
                <Table.LinkCell className="w-1/6 pr-5 text-right" href={href}></Table.LinkCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Main>
    </>
  );
};

ProjectsIndex.layout = (page) => <Authenticated title="Projects">{page}</Authenticated>;

export default ProjectsIndex;
