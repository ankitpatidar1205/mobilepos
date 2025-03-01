import { Breadcrumbs, Link, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export default function BreadcrumbCustom() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const pathSegments = location.split("/").filter((segment) => segment !== "");

  // Create Breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => ({
    label: segment,
    path: `/${pathSegments.slice(0, index + 1).join("/")}`,
  }));

  return (
    <div className="p-2 d-flex  align-items-center gap-2">
      {/* Back & Forward Navigation */}
      <IconButton size="small" onClick={() => navigate(-1)}>
        <ArrowBack fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={() => window.history.forward()}>
        <ArrowForward fontSize="small" />
      </IconButton>

      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" className="text-blue-500">
          Home
        </Link>
        {breadcrumbItems.map((item, index) => (
          <span key={index}>
            {index !== breadcrumbItems.length - 1 ? (
              <Link to={item.path} className="text-blue-500 hover:underline">
                {item.label}
              </Link>
            ) : (
              <Typography color="textPrimary">{item.label}</Typography>
            )}
          </span>
        ))}
      </Breadcrumbs>
    </div>
  );
}
