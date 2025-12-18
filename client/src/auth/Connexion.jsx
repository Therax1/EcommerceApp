import AuthInput from "../components/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Connexion() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirection vers la page d'accueil
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Une erreur inattendue s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      {/* Logo ou titre du site */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">WestAf</h1>
        <p className="text-gray-600 text-lg">E-Commerce</p>
      </div>

      {/* Formulaire de connexion */}
      <div className="bg-white border border-gray-300 rounded-lg p-10 shadow-md">
        <h2 className="text-3xl font-normal mb-8">Se connecter</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email
            </label>
            <AuthInput
              type="email"
              name="email"
              id="email"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Mot de passe
            </label>
            <AuthInput
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mot de passe oublié */}
          <div className="text-right">
            <Link
              to="/mot-de-passe-oublie"
              className="text-sm text-blue-600 hover:text-amber-600 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Bouton Se connecter */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 rounded-md text-base font-medium transition-all duration-200 border border-amber-600 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>

      {/* Lien vers inscription */}
      <div className="mt-8 text-center">
        <p className="text-base text-gray-600">
          Pas encore de compte ?{" "}
          <Link
            to="/inscription"
            className="text-blue-600 hover:text-amber-600 hover:underline font-medium"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
