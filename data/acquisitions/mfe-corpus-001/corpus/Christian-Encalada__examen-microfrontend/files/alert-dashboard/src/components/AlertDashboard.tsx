import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const AlertCard = styled.div<{ alertType: 'examen' | 'tarea' | 'cancelada' | null }>`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => {
    if (!props.alertType) return '#f3f4f6';
    switch (props.alertType) {
      case 'examen':
        return '#dbeafe';
      case 'tarea':
        return '#dcfce7';
      case 'cancelada':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  border-left: 4px solid ${props => {
    if (!props.alertType) return '#9ca3af';
    switch (props.alertType) {
      case 'examen':
        return '#2563eb';
      case 'tarea':
        return '#16a34a';
      case 'cancelada':
        return '#dc2626';
      default:
        return '#9ca3af';
    }
  }};
  transition: all 0.3s ease;
`;

const AlertType = styled.div<{ alertType: 'examen' | 'tarea' | 'cancelada' | null }>`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => {
    if (!props.alertType) return '#6b7280';
    switch (props.alertType) {
      case 'examen':
        return '#1e40af';
      case 'tarea':
        return '#15803d';
      case 'cancelada':
        return '#991b1b';
      default:
        return '#6b7280';
    }
  }};
  text-transform: capitalize;
`;

const AlertMessage = styled.p`
  margin: 0;
  color: #374151;
  font-size: 1rem;
  line-height: 1.5;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #9ca3af;
  font-style: italic;
`;

type AlertType = 'examen' | 'tarea' | 'cancelada';

interface Alert {
  type: AlertType;
  message: string;
  timestamp: string;
}

const AlertDashboard = () => {
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);

  useEffect(() => {
    const handleAlert = (event: Event) => {
      const customEvent = event as CustomEvent<Alert>;
      setCurrentAlert(customEvent.detail);
    };

    window.addEventListener('academic-alert', handleAlert);

    return () => {
      window.removeEventListener('academic-alert', handleAlert);
    };
  }, []);

  return (
    <Container>
      <Title>Panel de Alertas Académicas</Title>
      {currentAlert ? (
        <AlertCard alertType={currentAlert.type}>
          <AlertType alertType={currentAlert.type}>
            {currentAlert.type === 'examen' && '📝 Examen'}
            {currentAlert.type === 'tarea' && '📋 Tarea'}
            {currentAlert.type === 'cancelada' && '❌ Clase Cancelada'}
          </AlertType>
          <AlertMessage>{currentAlert.message}</AlertMessage>
        </AlertCard>
      ) : (
        <EmptyState>
          No hay alertas activas. Las alertas aparecerán aquí cuando se envíen.
        </EmptyState>
      )}
    </Container>
  );
};

export default AlertDashboard;
