import React from "react";
import core from "../core";
import { ThemeInterface } from "../core/entities/ui/themes";

export default React.createContext<ThemeInterface>(core.ui.THEME.value);
