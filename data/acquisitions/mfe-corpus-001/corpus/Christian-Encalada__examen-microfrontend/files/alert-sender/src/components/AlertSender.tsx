import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button<{ alertType: 'examen' | 'tarea' | 'cancelada' }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  background-color: ${props => {
    switch (props.alertType) {
      case 'examen':
        return '#2563eb';
      case 'tarea':
        return '#16a34a';
      case 'cancelada':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
  }
`;

type AlertType = 'examen' | 'tarea' | 'cancelada';

const alertMessages: Record<AlertType, string> = {
  examen: 'Hay un examen programado para esta semana',
  tarea: 'Nueva tarea asignada. Revisa el aula virtual',
  cancelada: 'La clase ha sido cancelada. Consulta el nuevo horario'
};

const AlertSender = () => {
  const sendAlert = (type: AlertType) => {
    const event = new CustomEvent('academic-alert', {
      detail: {
        type,
        message: alertMessages[type],
        timestamp: new Date().toISOString()
      }
    });
    
    window.dispatchEvent(event);
  };

  return (
    <Container>
      <Title>Enviar Alerta Académica</Title>
      <ButtonContainer>
        <Button alertType="examen" onClick={() => sendAlert('examen')}>
          Examen
        </Button>
        <Button alertType="tarea" onClick={() => sendAlert('tarea')}>
          Tarea
        </Button>
        <Button alertType="cancelada" onClick={() => sendAlert('cancelada')}>
          Clase Cancelada
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default AlertSender;
