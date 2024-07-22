import CheckCircleIcon from "../../../icons/CheckCircleIcon";
import DotCircleIcon from "../../../icons/DotCircleIcon";
import { RequirementCardProps } from "../../../icons/types";

const RequirementCard: React.FC<RequirementCardProps> = ({
  text,
  hasPassed,
}) => {
  const color = hasPassed
    ? "text-green-600 font-semibold"
    : "text-red-600 font-semibold";

  const IconComponent = hasPassed ? CheckCircleIcon : DotCircleIcon;

  return (
    <div>
      <IconComponent className={`tetx-lg ${color} mr-2`} />
      <p className={`text-sm ${color}`}>{text} </p>
    </div>
  );
};
export default RequirementCard;
