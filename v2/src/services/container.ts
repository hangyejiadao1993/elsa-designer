﻿import {Container} from "inversify";
import {ServerConfiguration} from "./server-configuration";
import {ActivityDisplayManager} from "./activity-display-manager";
import {FieldDisplayManager} from "./field-display-manager";
import {CustomDriverStore} from "./custom-driver-store";
import {ExpressionTypeStore} from "./expression-type-store";
import {CommonDriver, DynamicPropsDriver} from "../drivers/activity-drivers";
import {ExpressionDriver, ListDriver, SelectDriver, TextDriver} from "../drivers/field-drivers";
import {ActivityDriver} from "./activity-driver";
import {Symbols} from "./symbols";
import {FieldDriver} from "./field-driver";
import {WorkflowInstanceStore} from "./workflow-instance-store";
import {WorkflowFactory} from "./workflow-factory";
import {WorkflowDefinitionStore} from "./workflow-definition-store";
import {ActivityDescriptorStore} from "./activity-descriptor-store";

export const createContainer = (serverUrl: string): Container => {
  const container = new Container();
  const configuration = new ServerConfiguration(serverUrl);

  container.bind<Container>(Container).toConstantValue(container);
  container.bind<ServerConfiguration>(ServerConfiguration).toConstantValue(configuration);
  container.bind<ActivityDescriptorStore>(ActivityDescriptorStore).toSelf().inSingletonScope();
  container.bind<WorkflowDefinitionStore>(WorkflowDefinitionStore).toSelf().inSingletonScope();
  container.bind<WorkflowInstanceStore>(WorkflowInstanceStore).toSelf().inSingletonScope();
  container.bind<WorkflowFactory>(WorkflowFactory).toSelf().inSingletonScope();
  container.bind<ActivityDisplayManager>(ActivityDisplayManager).toSelf().inSingletonScope();
  container.bind<FieldDisplayManager>(FieldDisplayManager).toSelf().inSingletonScope();
  container.bind<CustomDriverStore>(CustomDriverStore).toSelf().inSingletonScope();
  container.bind<ExpressionTypeStore>(ExpressionTypeStore).toSelf().inSingletonScope();

  addActivityDriver(container, CommonDriver);
  addActivityDriver(container, DynamicPropsDriver);
  addFieldDriver(container, ExpressionDriver);
  addFieldDriver(container, ListDriver);
  addFieldDriver(container, SelectDriver);
  addFieldDriver(container, TextDriver);

  return container;
};

export const addActivityDriver = (container: Container, constructor: { new(...args: any[]): ActivityDriver }) => container.bind<ActivityDriver>(Symbols.ActivityDriver).to(constructor).inSingletonScope();
export const addFieldDriver = (container: Container, constructor: { new(...args: any[]): FieldDriver }) => container.bind<FieldDriver>(Symbols.FieldDriver).to(constructor).inSingletonScope();