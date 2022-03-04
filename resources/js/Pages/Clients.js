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

const ClientModal = ({
  data,
  errors,
  submit,
  setData,
  processing,
  isEditing,
  setisEditing,
}) => {
  const ref = React.useRef(null);

  React.useEffect(() => isEditing && ref.current.showModal(), [isEditing]);

  const onSubmit = (e) => {
    submit(e);
    ref.current.hideModal();
  };

  const afterLeave = () => {
    setData({});
    setisEditing(false);
  };

  return (
    <Modal title={"Add Client"} ref={ref} afterLeave={afterLeave}>
      <div className="border-t border-gray-300">
        <form className="space-y-2" onSubmit={onSubmit}>
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
          <ButtonBlack className={processing ?? "disabled"}>Submit</ButtonBlack>
        </form>
      </div>
    </Modal>
  );
};

export default function Clients({ auth, errors, clients }) {
  const { delete: destroy } = useForm();
  const [isEditing, setisEditing] = React.useState(false);
  const { data, setData, post, patch, reset, processing } = useForm({
    company: "",
    vat: "",
    address: "",
  });

  const openEditModal = (client) => {
    setData({
      id: client.id,
      company: client.company,
      vat: client.vat,
      address: client.address,
    });
    setisEditing(true);
  };

  const addClient = (e) => {
    e.preventDefault();
    post(route("clients.store"), {
      preserveScroll: true,
      onSuccess: () => {
        console.log("success!");
        reset(...Object.keys(data));
      },
    });
  };

  const updateClient = (e) => {
    e.preventDefault();
    patch(route("clients.update", data.id), {
      preserveScroll: true,
      onSuccess: () => {
        console.log("updated client");
        reset(...Object.keys(data));
      },
    });
  };

  function submit(e) {
    switch (isEditing) {
      case true:
        updateClient(e);
        break;
      case false:
        addClient(e);
        break;
    }
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
          <ClientModal
            errors={errors}
            data={data}
            processing={processing}
            submit={submit}
            setData={setData}
            isEditing={isEditing}
            setisEditing={setisEditing}
          />

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
                      <Button
                        label="Edit"
                        onClick={() => openEditModal(client)}
                      />{" "}
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
