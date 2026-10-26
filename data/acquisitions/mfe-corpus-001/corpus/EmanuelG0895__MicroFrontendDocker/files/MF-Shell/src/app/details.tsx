import React from "react";
import { useParams } from "react-router-dom";
const Vista = React.lazy(() => import("MF_Characters/Vista"));

interface DetailsProps {
  characterId?: number;
}

const Details: React.FC<DetailsProps> = ({ characterId }) => {
  const params = useParams<{ id: string }>();
  const idFromParams = params.id ? parseInt(params.id) : characterId || 1;

  return <Vista characterId={idFromParams} />;
};

export default Details;
