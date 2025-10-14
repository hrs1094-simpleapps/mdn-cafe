import { useState, useCallback, useEffect } from "react";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Checkbox from "../../components/form/input/Checkbox";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { useFoodManagement } from "../../hooks/foodManager";
import Alert from "../../components/ui/alert/Alert";
import BouncingBallAnim from "../../components/ui/animation/BouncingBallAnim";

export default function Registration() {
  const { isOpen, openModal, closeModal } = useModal();

  const [monthlyType, setMonthlyType] = useState<boolean>(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [reportEmail, setReportEmail] = useState("");

  const handleTypeChange = (value: boolean) => {
    setMonthlyType(value);
  };

  const [isBreakfast, setBreakfast] = useState<boolean>(true);
  const [isLunch, setLunch] = useState<boolean>(true);
  const [isSnacks, setSnacks] = useState<boolean>(true);

  const { onSpot, subscribe, onSpotStatus, subscribeStatus } =
    useFoodManagement();

  const confirmOnSpot = useCallback(() => {
    onSpot(
      name.trim(),
      email.trim(),
      "",
      isBreakfast ? "1" : "0",
      isLunch ? "1" : "0",
      isSnacks ? "1" : "0"
    );
    closeModal();
  }, [onSpot, name, email, isBreakfast, isLunch, isSnacks, closeModal]);

  const confirmSubscription = useCallback(() => {
    subscribe(
      name.trim(),
      email.trim(),
      "",
      isBreakfast ? "1" : "0",
      isLunch ? "1" : "0",
      isSnacks ? "1" : "0"
    );
    closeModal();
  }, [subscribe, name, email, isBreakfast, isLunch, isSnacks, closeModal]);

  const handleSubmit = () => {
    setError("");
    setSuccess(false);
    if (
      email.trim() !== "" &&
      name.trim() !== "" &&
      !onSpotStatus?.isLoading &&
      !subscribeStatus?.isLoading
    ) {
      openModal();
    }
  };

  const handleEmailReport = () => {
    console.log(reportEmail);
  };

  const reset = useCallback(() => {
    setEmail("");
    setName("");
    setBreakfast(true);
    setSnacks(true);
    setLunch(true);
  }, []);

  useEffect(() => {
    if (onSpotStatus.data) {
      if (onSpotStatus.data.data.result === 0) {
        reset();
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    }
  }, [onSpotStatus.data, reset]);

  useEffect(() => {
    if (subscribeStatus.data) {
      if (subscribeStatus.data.data.result === 0) {
        reset();
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    }
  }, [reset, subscribeStatus.data]);

  useEffect(() => {
    if (onSpotStatus.error || subscribeStatus.error) {
      setError("Request failed");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    if (
      onSpotStatus?.data?.data?.result === 1 ||
      subscribeStatus?.data?.data?.result === 1
    ) {
      setError("Request failed");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
  }, [
    onSpotStatus?.data?.data?.result,
    onSpotStatus.error,
    subscribeStatus?.data?.data?.result,
    subscribeStatus.error,
  ]);

  const loading = onSpotStatus.isLoading || subscribeStatus.isLoading;

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full lg:flex-row dark:bg-gray-900 sm:p-0">
        <ComponentCard
          title="MDN CAFE"
          className="m-0 my-2 align-center  justify-center p-5"
        >
          <div className="flex justify-center">
            <div className="relative inline-flex p-1 mx-auto bg-gray-200 rounded-full z-1 dark:bg-gray-800 align-center">
              <span
                className={`absolute top-1/2 -z-1 flex h-11 w-[120px] -translate-y-1/2 rounded-full bg-white shadow-theme-xs duration-200 ease-linear dark:bg-white/10  ${
                  monthlyType ? "translate-x-full" : "translate-x-0"
                }`}
              ></span>
              <button
                className={`flex h-11 w-[120px] items-center justify-center text-base font-medium  ${
                  monthlyType
                    ? "text-gray-500 hover:text-gray-700 dark:hover:text-white/70 dark:text-gray-400"
                    : "text-gray-800 dark:text-white/90"
                }`}
                onClick={() => {
                  handleTypeChange(false);
                }}
              >
                On Spot
              </button>
              <button
                className={`flex h-11 w-[120px] items-center justify-center text-base font-medium  ${
                  !monthlyType
                    ? "text-gray-500 hover:text-gray-700 dark:hover:text-white/70 dark:text-gray-400"
                    : "text-gray-800 dark:text-white/90"
                }`}
                onClick={() => {
                  handleTypeChange(true);
                }}
              >
                Subscription
              </button>
            </div>
          </div>

          <div className="h-[1px] m-0" />
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90 ">
            {"Please select your option"}
          </h3>
          <ComponentCard title="Choose options">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isBreakfast}
                  onChange={setBreakfast}
                  label="Breakfast"
                />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked={isLunch} onChange={setLunch} label="Lunch" />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isSnacks}
                  onChange={setSnacks}
                  label="Snacks"
                />
              </div>
            </div>
          </ComponentCard>

          <div className="h-[1px] m-1" />
          <div className="space-y-6 ">
            <div>
              <Label>
                Email <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <Label>
                Name <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          {(error || success) && (
            <Alert
              variant={error ? "error" : "success"}
              title="Done"
              message={error ? error : "Successfully registered"}
            />
          )}
          <Button
            className="w-full mt-4"
            size="sm"
            onClick={async (e) => {
              e?.preventDefault();
              handleSubmit();
            }}
          >
            {loading ? (
              <BouncingBallAnim />
            ) : monthlyType ? (
              "Subscribe"
            ) : (
              "Submit"
            )}
          </Button>
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6 mt-6">
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400 mb-4 flex-wrap text-wrap">
              Enter your email and hit the button to get your monthly report.
              <br />
              report will be sent to your email!
            </p>
            <div>
              <Input
                placeholder="Enter your email"
                value={reportEmail}
                onChange={(e) => {
                  setReportEmail(e.target.value);
                }}
              />
            </div>
            <Button
              className="w-full mt-4"
              size="sm"
              onClick={async (e) => {
                e?.preventDefault();
                handleEmailReport();
              }}
            >
              {"Email report"}
            </Button>
          </div>
        </ComponentCard>

        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Confirm
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Please confirm following.
            </p>
          </div>
          <div
            className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6`}
          >
            <p className="mb-6 text-md text-gray-500 dark:text-gray-400 lg:mb-7">
              Name: <strong>{name}</strong>
              <br />
              Email: <strong>{email}</strong>
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isBreakfast}
                  onChange={setBreakfast}
                  label="Breakfast"
                  disabled
                />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isLunch}
                  onChange={setLunch}
                  label="Lunch"
                  disabled
                />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isSnacks}
                  onChange={setSnacks}
                  disabled
                  label="Snacks"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (monthlyType) {
                  confirmSubscription();
                } else {
                  confirmOnSpot();
                }
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
