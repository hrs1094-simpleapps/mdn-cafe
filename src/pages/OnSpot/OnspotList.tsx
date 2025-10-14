import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import OnSpotTable from "../../components/tables/Onspot/OnSpotTable";

export default function OnSpotUserList() {
  return (
    <>
      <PageBreadcrumb pageTitle="OnSpot" />
      <div className="space-y-6">
        <ComponentCard title="OnSpot list">
          <OnSpotTable />
        </ComponentCard>
      </div>
    </>
  );
}
