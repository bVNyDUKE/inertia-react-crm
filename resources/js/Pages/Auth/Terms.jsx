import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import { useForm } from "@inertiajs/react";

export default function Terms() {
  const { data, setData, post, errors } = useForm({
    termsAccepted: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/accept-terms");
  };

  return (
    <Guest>
      {errors.termsAccepted && (
        <div className="mb-10 text-center">
          <p className="text-xl text-indigo-600">Please accept the T&C</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <textarea disabled className="h-72 w-full" defaultValue={"Terms and Conditions"} />
        </div>
        <div className="mt-10 flex justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="termsAccepted" value={data.termsAccepted} onChange={(e) => setData("termsAccepted", e.target.checked)} />
            <label htmlFor="termsAccepted">I accept the T&C</label>
          </div>
          <Button type="submit" label={"Submit"} />
        </div>
      </form>
    </Guest>
  );
}
