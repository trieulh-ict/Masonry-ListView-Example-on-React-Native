import { LayoutProvider } from "recyclerlistview";
import { Dimensions } from "react-native";

export class LayoutUtil {
         static getWindowWidth() {
           // To deal with precision issues on android
           return (
             Math.round(Dimensions.get("window").width * 1000) / 1000 - 6
           ); //Adjustment for margin given to RLV;
         }

         static getRandomInt = (min, max) => {
           return Math.floor(Math.random() * (max - min + 1) + min);
         };

         static getLayoutProvider(type, data) {
           switch (type) {
             case 0:
               return new LayoutProvider(
                 () => {
                   return "VSEL"; //Since we have just one view type
                 },
                 (type, dim, index) => {
                   dataElement = data[index];
                   const columnWidth = LayoutUtil.getWindowWidth() / (index%3 == 0 ? 1 : 2);
                   const columnHeight =
                     (columnWidth * dataElement.height) /
                     dataElement.width;
                   switch (type) {
                     case "VSEL":
                       dim.width = columnWidth;
                       dim.height = columnHeight;

                       break;
                     default:
                       dim.width = 0;
                       dim.heigh = 0;
                   }
                 }
               );
             case 1:
               return new LayoutProvider(
                 () => {
                   return "VSEL";
                 },
                 (type, dim) => {
                   switch (type) {
                     case "VSEL":
                       dim.width = LayoutUtil.getWindowWidth() / 2;
                       dim.height = 250;
                       break;
                     default:
                       dim.width = 0;
                       dim.heigh = 0;
                   }
                 }
               );
             case 2:
               return new LayoutProvider(
                 () => {
                   return "VSEL";
                 },
                 (type, dim) => {
                   switch (type) {
                     case "VSEL":
                       dim.width = LayoutUtil.getWindowWidth();
                       dim.height = 200;
                       break;
                     default:
                       dim.width = 0;
                       dim.heigh = 0;
                   }
                 }
               );
             default:
               return new LayoutProvider(
                 () => {
                   return "VSEL";
                 },
                 (type, dim) => {
                   switch (type) {
                     case "VSEL":
                       dim.width = LayoutUtil.getWindowWidth();
                       dim.height = 300;
                       break;
                     default:
                       dim.width = 0;
                       dim.heigh = 0;
                   }
                 }
               );
           }
         }
       }
