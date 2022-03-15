import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/CRM/Table";
import Button from "@/Components/CRM/Button";
import Pagination from "@/Components/CRM/Pagination";

export default function ProjectsIndex({ auth, errors, projects }) {
  return (
    <Authenticated auth={auth} errors={errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}>
      <Head title="Projects" />

      <div className="p-8 lg:px-14 max-w-screen-2xl mx-auto">
        <div className="mx-auto">
          <div className="inset-0 mb-4">
            <Link href={route("projects.create")}>
              <Button label={"Add Project"} />
            </Link>
          </div>

          <div className="bg-white shadow-sm">
            <Table.Main title="Project List">
              <Table.Head headers={["Title", "User", "Client", "Status", ""]} />
              <Table.Body>
                {projects.data.map((project) => (
                  <Table.Row key={project.id}>
                    <Table.Cell className="w-1/3" data={project.title} />
                    <Table.Cell data={project.user.name} />
                    <Table.Cell data={project.client.company} />
                    <Table.Cell className="w-10" data={project.status} />
                    <Table.Cell className="w-1/6 text-right pr-5">
                      <Button label="Edit" /> <Button color="red" label="Delete" />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Main>
            <Pagination paginator={projects} />
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
