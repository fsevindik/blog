import { PasswordRequirementProps } from "../../../types/types";
import RequirementCard from "./RequirementCard";

const PasswordRequirements: React.FC<PasswordRequirementProps> = ({
  password,
}) => {
  const hasPsValue = password.trim() !== "";
  const hasAtLeast6chars = password.length >= 6;
  const hasPsNumber = /\d/.test(password);
  const hasPsSmallCase = /[a-z]/.test(password);
  // maybe for another projects..:)
  // const hasPsassword7chars = password.length > 6;
  // const hasPsUpperCase = /[A-Z]/.test(password);
  // const hasPsSymbol = /\W|_/g.test(password);

  return (
    <div className="flex flex-col w-350px  h-130px p-1 rounded-md bg-slate-100">
      <RequirementCard text="Required" hasPassed={hasPsValue} />
      <RequirementCard
        text="At least 6 characters"
        hasPassed={hasAtLeast6chars}
      />
      <RequirementCard text="At least one number" hasPassed={hasPsNumber} />
      <RequirementCard
        text="At least one lowercase letter"
        hasPassed={hasPsSmallCase}
      />
    </div>
  );
};

export default PasswordRequirements;
