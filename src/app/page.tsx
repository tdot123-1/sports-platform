import CostEstimate from "@/components/profile/form-components/cost-estimate";

export default function Home() {
  return (
    <>
      <section className="px-4">
        <h1>Sports platform</h1>
        <p>What's new</p>
        <CostEstimate pending={false} name="cost_estimate" />
      </section>
    </>
  );
}
