import {useContext} from "react";
import {ServicesContext} from "@src/provider";
import Services from "../services";

/**
 * Хук для доступа к менеджеру сервисов
 * @return {Store|{}}
 */
export default function useServices(){
  return useContext(ServicesContext) as Services;
}
