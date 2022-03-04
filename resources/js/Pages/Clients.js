import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/CRM/Table";
import Modal from "@/Components/CRM/Modal";
import Button from "@/Components/CRM/Button";
import Input from "@/Components/Breeze/Input";
import Label from "@/Components/Breeze/Label";
import ValidationErrors from "@/Components/Breeze/ValidationErrors";
import { default as ButtonBlack } from "@/Components/Breeze/Button";

export default function Clients({ auth, errors, clients }) {
  const {
    data,
    setData,
    post,
    delete: destroy,
    reset,
    processing,
  } = useForm({
    company: "",
    vat: "",
    address: "",
  });
  const ref = React.useRef(null);

  function submit(e) {
    e.preventDefault();
    post(route("clients.store"), {
      preserveScroll: true,
      onSuccess: () => {
        console.log("success!");
        reset(...Object.keys(data));
        ref.current.hideModal();
      },
    });
  }

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Clients
        </h2>
      }
    >
      <Head title="Clients" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Modal title={"Add Client"} ref={ref}>
            <div className="border-t border-gray-300">
              <form className="space-y-2" onSubmit={submit}>
                <ValidationErrors errors={errors} />
                <Label forInput={"company"}>Company</Label>
                <Input
                  name={"company"}
                  value={data.company}
                  required={true}
                  handleChange={(e) => setData("company", e.target.value)}
                  className={"w-full"}
                />
                <Label forInput={"vat"}>VAT</Label>
                <Input
                  name={"vat"}
                  value={data.vat}
                  required={true}
                  handleChange={(e) => setData("vat", e.target.value)}
                  className={"w-full"}
                />
                <Label forInput={"address"}>Address</Label>
                <Input
                  name={"address"}
                  value={data.address}
                  required={true}
                  handleChange={(e) => setData("address", e.target.value)}
                  className={"w-full"}
                />
                <ButtonBlack className={processing ?? "disabled"}>
                  Submit
                </ButtonBlack>
              </form>
            </div>
          </Modal>

          <div className="bg-white shadow-sm">
            <Table.Main title="Client List">
              <Table.Head headers={["Company", "VAT", "Address", ""]} />
              <Table.Body>
                {clients.map((client, index) => (
                  <Table.Row key={client.id} stripped={index % 2 === 0}>
                    <Table.Cell data={client.company} />
                    <Table.Cell data={client.vat} />
                    <Table.Cell data={client.address} />
                    <Table.Cell>
                      {" "}
                      <Button label="Edit" />{" "}
                      <Button
                        color="red"
                        label="Delete"
                        onClick={() =>
                          destroy(route("clients.destroy", client.id))
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Main>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
