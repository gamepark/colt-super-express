/** @jsxImportSource @emotion/react */
import { RuleId } from "@gamepark/colt-super-express/rules/RuleId";
import { ComponentType } from "react";
import { SchemingHeader } from "./SchemingHeader";

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.Scheming]: SchemingHeader,
};
