import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import SuscribersTable from "../../components/tables/Subscribers/SubscribersTable";

export default function SuscribersList() {
  return (
    <>
      <PageBreadcrumb pageTitle="Subscribers" />
      <div className="space-y-6">
        <ComponentCard title="Subscribers list">
          <SuscribersTable />
        </ComponentCard>
      </div>
    </>
  );
}
