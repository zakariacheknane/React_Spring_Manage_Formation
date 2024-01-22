import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../Auth/auth.action";


const UserProfileComponent = () => {
  const dispatch = useDispatch();
  
  // Appeler la fonction getCurrentUser au chargement du composant
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Utiliser le hook useSelector pour extraire les données utilisateur du Redux Store
  const userData = useSelector((state) => state.auth.loading);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Bienvenue, {userData.token}!</h2>
          {/* Affichez d'autres informations utilisateur si nécessaire */}
        </div>
      ) : (
        <p>Aucun utilisateur connecté</p>
      )}
    </div>
  );
};

export default UserProfileComponent;
