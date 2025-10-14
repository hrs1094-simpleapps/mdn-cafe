import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import EmployeeTable from "../../components/tables/EmployeeTable/EmployeeTable";

export default function EmployeesList() {
  return (
    <>
      <PageBreadcrumb pageTitle="Employees" />
      <div className="space-y-6">
        <ComponentCard title="Employee list">
          <EmployeeTable />
        </ComponentCard>
      </div>
    </>
  );
}
