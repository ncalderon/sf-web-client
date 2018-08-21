package com.calderon.sf.cucumber.stepdefs;

import com.calderon.sf.SfwebApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = SfwebApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
