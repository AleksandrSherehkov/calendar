import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RxCross2 } from 'react-icons/rx';
import {
  BackdropStyled,
  CloseButtonStyled,
  ModalWrapperStyled,
} from './Modal.styled';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [modalContainer, setModalContainer] = useState<Element | null>(null);

  useEffect(() => {
    setModalContainer(document.getElementById('modal-root'));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  if (!isOpen || !modalContainer) return null;

  return createPortal(
    <BackdropStyled onClick={onClose}>
      <ModalWrapperStyled onClick={e => e.stopPropagation()}>
        <CloseButtonStyled
          onClick={onClose}
          className="absolute top-2 right-2 "
        >
          <RxCross2
            size={20}
            className="cursor-pointer text-fogWhite hover:text-azure"
          />
        </CloseButtonStyled>
        {children}
      </ModalWrapperStyled>
    </BackdropStyled>,
    modalContainer
  );
};

export default Modal;
