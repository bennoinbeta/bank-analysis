import React from "react";
import {ui} from "../core";
import { ThemeInterface } from "../core/entities/ui/themes";

export default React.createContext<ThemeInterface>(ui.THEME.value);
