import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Listbox, ListboxItem, Chip, ScrollShadow, Avatar } from "@nextui-org/react";
import { UserModel2 } from "../util/UserModel2";
import { ListboxWrapper } from "./ListboxWrapper";

const AssignUserModal = ({ onAssignUsers }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  const arrayValues = Array.from(selectedUsers);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>{UserModel2.find((user) => `${user.id}` === `${value}`).name}</Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues]);

  const handleAssign = () => {
    onAssignUsers(arrayValues);
    onOpenChange(false);
  };

  return (
    <>
      <Button onPress={onOpen} color="warning" >Add User</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Assign Users to Project</ModalHeader>
              <ModalBody>
                <ListboxWrapper>
                  <Listbox
                    topContent={topContent}
                    classNames={{ base: "max-w-xs", list: "max-h-[300px] overflow-scroll" }}
                    items={UserModel2}
                    label="Select Users"
                    selectionMode="multiple"
                    onSelectionChange={setSelectedUsers}
                    variant="flat"
                  >
                    {(item) => (
                      <ListboxItem key={item.id} textValue={item.name}>
                        <div className="flex gap-2 items-center">
                          <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
                          <div className="flex flex-col">
                            <span className="text-small">{item.name}</span>
                            <span className="text-tiny text-default-400">{item.email}</span>
                          </div>
                        </div>
                      </ListboxItem>
                    )}
                  </Listbox>
                </ListboxWrapper>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
                <Button color="primary" onPress={handleAssign}>Assign</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignUserModal;
