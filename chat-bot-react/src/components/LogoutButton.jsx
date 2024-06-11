import React from "react";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../assets/icons/logout_icon.tsx";

function Logout() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, etc.
    // Después, redirigir al usuario a la página de inicio de sesión
    navigate("/");
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="bordered" display="flex" css={{ position: 'relative',width: '20px' }} onPress={onOpen}>
        <LogoutIcon></LogoutIcon>
      </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">¿Estás seguro de que quieres cerrar sesión?</ModalHeader>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleLogout}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Regresar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Logout;
