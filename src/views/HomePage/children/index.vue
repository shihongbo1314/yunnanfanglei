<template>
    <div class="table_class">
        <div class="header">
            <div>项目统计</div>
            <el-button @click="Goback()" size="mini" style="height: 30px;margin-top: 5px;">返回</el-button>
        </div>
        <div class="footer">
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="已完成" name="1">
                    <div class="condition">
                        <el-form :inline="true" :model="formInline" size='mini' class="demo-form-inline">
                            <el-form-item label="档案编号：">
                                <el-input v-model="formInline.number" placeholder="请填写档案编号"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="发票信息：">
                                <el-input
                                    v-model="formInline.invoice"
                                    placeholder="请填写发票信息"
                                ></el-input>
                            </el-form-item> -->
                            <el-form-item label="单位名称：">
                                <el-input v-model="formInline.company_name" placeholder="请填写单位名称"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称：">
                                <el-input v-model="formInline.project_name" placeholder="请填写项目名称"></el-input>
                            </el-form-item>
                            <el-form-item label="类别：">
                                <el-select v-model="formInline.type" placeholder="请选择">
                                    <el-option label="民用" value="民用"></el-option>
                                    <el-option label="危化" value="危化"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="测试单位：">
                                <el-input v-model="formInline.textCompany" placeholder="请填写测试单位"></el-input>
                            </el-form-item>
                            <!--  <el-form-item label="检测人：">
                                <el-input
                                    v-model="formInline.tester"
                                    placeholder="请填写检测人"
                                ></el-input>
                            </el-form-item> -->
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="footer-table">
                        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border
                            style="width: 100%;height:100%;overflow-y: auto;">
                            <el-table-column type="expand" label="详细信息" width="80">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <el-form-item label="制作人：" v-if="props.row.makeUserMap">
                                            <span>{{ props.row.makeUserMap.true_name || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="合同编号：">
                                            <span>{{ props.row.contractNumber || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="合同金额：">
                                            <span>{{ props.row.contractMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="支付金额：">
                                            <span>{{ props.row.payMoney || '-' }}</span>
                                        </el-form-item>

                                        <el-form-item label="开票时间：">
                                            <span>{{ props.row.invoiceTime || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="入账时间：">
                                            <span>{{ props.row.arrivalTime || '-' }}</span>
                                        </el-form-item>

                                    </el-form>
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <el-form-item label="入账金额：">
                                            <span>{{ props.row.arrivalMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="预拨时间：">
                                            <span>{{ props.row.advanceTime || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="预拨金额：">
                                            <span>{{ props.row.advanceMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="开票金额：">
                                            <span>{{ props.row.invoiceMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="发票号码：">
                                            <span>{{ props.row.invoiceNumber || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="欠款金额：">
                                            <span>{{ props.row.arrearsMoney || '-' }}</span>
                                        </el-form-item>
                                    </el-form>
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <!-- <el-form-item label="检测报告下载：">
                                            <span
                                                @click="Download(props.row.testImg)"
                                                style="cursor:pointer;"
                                            >{{ props.row.testImg!=null ? props.row.testImg: '-'}}</span>
                                        </el-form-item> -->
                                        <el-form-item label="检测报告痕迹版下载：">
                                            <span @click="Download(props.row.testMarkImg)" style="cursor:pointer;">{{
                                                props.row.testMarkImg != null ? '(' +props.row.testMarkImg.split('(')[1]:
                                                '-'}}</span>
                                        </el-form-item>
                                        <el-form-item label="检测报告打印版下载：">
                                            <span
                                                @click="Download(props.row.testPrintImg != null ? props.row.testPrintImg.split('.')[0] + '.pdf' : '')"
                                                style="cursor:pointer;">{{ props.row.testPrintImg != null ? '(' +
                                                    props.row.testPrintImg.split('(')[1].replaceAll('.docx','.pdf'):
                                                '-'}}</span>
                                           <span @click="lookPwdShow = !lookPwdShow"
                                        v-if="props.row.testPrintImg != null"
                                        style="cursor:pointer;margin-left: 10px;">{{ lookPwdShow ? '隐藏' : '查看' }}密码</span>
                                    <span v-if="lookPwdShow">{{ ':' + props.row.lookPwd }}</span>
                                        </el-form-item>
                                        <el-form-item label="检测报告正式版下载：">
                                            <span @click="Download(props.row.testFormalImg)" style="cursor:pointer;">{{
                                                props.row.testFormalImg ? '(' +props.row.testFormalImg.split('(')[1]:
                                                '-'}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <!--   <el-table-column
                            type="selection"
                            width="55"
                        >
                        </el-table-column> -->
                            <el-table-column label="档案编号" width="120" align="center">
                                <template slot-scope="scope">{{ scope.row.number }}</template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="invoice"
                                label="发票信息"
                                width="120"
                                align="center"
                            >
                            </el-table-column> -->
                            <el-table-column prop="companyName" label="委托方名称" align="center">
                            </el-table-column>
                            <el-table-column prop="projectName" label="项目名称" align="center">
                            </el-table-column>
                            ji<el-table-column prop="projectName" label="原始记录" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/ProjectOriginalRecord/' + imgCom(scope.row.originalRecordImg ? scope.row.originalRecordImg : '')"
                                        @click.stop="pdfSrcShow2(scope.row.originalRecordPath)"
                                        v-if="scope.row.originalRecordImg != null">
                                    </el-image>
                                    <span v-else> 未上传 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="projectName" label="合同" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/Contract/' + imgCom(scope.row.contractImg)"
                                        @click.stop="pdfSrcShow(scope.row.contractFile)" v-if="scope.row.contractImg">
                                    </el-image>
                                    <span v-else> 未上传 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="projectName" label="现场照片" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/ProjectOriginalRecord/' + imgCom(scope.row.sceneImg)"
                                        @click.stop="imgShowList(scope.row.sceneImg)" v-if="scope.row.sceneImg">
                                    </el-image>
                                    <span v-else> - </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="contractMoney" label="合同金额" align="center">
                            </el-table-column>
                            <el-table-column prop="payMoney" label="支付金额" align="center">
                            </el-table-column>
                            <el-table-column prop="type" label="类别" align="center">
                            </el-table-column>
                            <el-table-column prop="textCompany" label="检测单位" align="center">
                            </el-table-column>
                            <!--   <el-table-column
                            prop="tester"
                            label="检测人"
                            align="center"
                        >
                        </el-table-column> -->
                            <el-table-column label="项目状态" align="center" width="100px">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.state | stateFilter(scope.row.state)"
                                        @click.stop="statusCondition(scope.row.id)" style="cursor: pointer;">{{
                                            scope.row.state | statusFilter(scope.row.examineTaskMap != null ?
                                        scope.row.examineTaskMap.role_id :"")}}</el-tag>
                                    <div v-if="scope.row.state == '16'">{{ scope.row.examineTime }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <Page :total="total" :pageNum="current" :pageSize="size" @pageChange="pageChange" />
                </el-tab-pane>
                <el-tab-pane label="进行中" name="2">
                    <div class="condition">
                        <el-form :inline="true" :model="formInline" size='mini' class="demo-form-inline">
                            <el-form-item label="档案编号：">
                                <el-input v-model="formInline.number" placeholder="请填写档案编号"></el-input>
                            </el-form-item>
                            <!--  <el-form-item label="发票信息：">
                                <el-input
                                    v-model="formInline.invoice"
                                    placeholder="请填写发票信息"
                                ></el-input>
                            </el-form-item> -->
                            <el-form-item label="单位名称：">
                                <el-input v-model="formInline.company_name" placeholder="请填写单位名称"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称：">
                                <el-input v-model="formInline.project_name" placeholder="请填写项目名称"></el-input>
                            </el-form-item>
                            <el-form-item label="类别：">
                                <el-select v-model="formInline.type" placeholder="请选择">
                                    <el-option label="民用" value="民用"></el-option>
                                    <el-option label="危化" value="危化"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="测试单位：">
                                <el-input v-model="formInline.textCompany" placeholder="请填写测试单位"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="检测人：">
                                <el-input
                                    v-model="formInline.tester"
                                    placeholder="请填写检测人"
                                ></el-input>
                            </el-form-item> -->
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="onSubmit1">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="footer-table">
                        <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" border
                            style="width: 100%;height:100%;overflow-y: auto;">
                            <el-table-column type="expand" label="详细信息" width="80">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <el-form-item label="制作人：" v-if="props.row.makeUserMap">
                                            <span>{{ props.row.makeUserMap.true_name || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="合同编号：">
                                            <span>{{ props.row.contractNumber || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="合同金额：">
                                            <span>{{ props.row.contractMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="支付金额：">
                                            <span>{{ props.row.payMoney || '-' }}</span>
                                        </el-form-item>

                                        <el-form-item label="开票时间：">
                                            <span>{{ props.row.invoiceTime || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="入账时间：">
                                            <span>{{ props.row.arrivalTime || '-' }}</span>
                                        </el-form-item>

                                    </el-form>
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <el-form-item label="入账金额：">
                                            <span>{{ props.row.arrivalMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="预拨时间：">
                                            <span>{{ props.row.advanceTime || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="预拨金额：">
                                            <span>{{ props.row.advanceMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="开票金额：">
                                            <span>{{ props.row.invoiceMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="发票号码：">
                                            <span>{{ props.row.invoiceNumber || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="欠款金额：">
                                            <span>{{ props.row.arrearsMoney || '-' }}</span>
                                        </el-form-item>
                                    </el-form>
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <!-- <el-form-item label="检测报告下载：">
                                            <span
                                                @click="Download(props.row.testImg)"
                                                style="cursor:pointer;"
                                            >{{ props.row.testImg!=null ? props.row.testImg: '-'}}</span>
                                        </el-form-item> -->
                                        <el-form-item label="检测报告痕迹版下载：">
                                            <span @click="Download(props.row.testMarkImg)" style="cursor:pointer;">{{
                                                props.row.testMarkImg != null ? '(' +props.row.testMarkImg.split('(')[1]:
                                                '-'}}</span>
                                        </el-form-item>
                                        <el-form-item label="检测报告打印版下载：">
                                            <span
                                                @click="Download(props.row.testPrintImg != null ? props.row.testPrintImg.split('.')[0] + '.pdf' : '')"
                                                style="cursor:pointer;">{{ props.row.testPrintImg != null ? '(' +
                                                    props.row.testPrintImg.split('(')[1].replaceAll('.docx','.pdf'):
                                                '-'}}</span>
                                            <span @click="lookPwdShow = !lookPwdShow"
                                        v-if="props.row.testPrintImg != null"
                                        style="cursor:pointer;margin-left: 10px;">{{ lookPwdShow ? '隐藏' : '查看' }}密码</span>
                                    <span v-if="lookPwdShow">{{ ':' + props.row.lookPwd }}</span>
                                        </el-form-item>
                                        <el-form-item label="检测报告正式版下载：">
                                            <span @click="Download(props.row.testFormalImg)" style="cursor:pointer;">{{
                                                props.row.testFormalImg ? '(' +props.row.testFormalImg.split('(')[1]:
                                                '-'}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <!--  <el-table-column
                            type="selection"
                            width="55"
                        >
                        </el-table-column> -->
                            <el-table-column label="档案编号" width="120" align="center">
                                <template slot-scope="scope">{{ scope.row.number }}</template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="invoice"
                                label="发票信息"
                                width="120"
                                align="center"
                            >
                            </el-table-column> -->
                            <el-table-column prop="companyName" label="委托方名称" align="center">
                            </el-table-column>
                            <el-table-column prop="projectName" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="projectName" label="原始记录" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/ProjectOriginalRecord/' + imgCom(scope.row.originalRecordImg ? scope.row.originalRecordImg : '')"
                                        @click.stop="pdfSrcShow2(scope.row.originalRecordPath)"
                                        v-if="scope.row.originalRecordImg != null">
                                    </el-image>
                                    <span v-else> 未上传 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="projectName" label="合同" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/Contract/' + imgCom(scope.row.contractImg)"
                                        @click.stop="pdfSrcShow(scope.row.contractFile)" v-if="scope.row.contractImg">
                                    </el-image>
                                    <span v-else> 未上传 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="projectName" label="现场照片" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/ProjectOriginalRecord/' + imgCom(scope.row.sceneImg)"
                                        @click.stop="imgShowList(scope.row.sceneImg)" v-if="scope.row.sceneImg">
                                    </el-image>
                                    <span v-else> 未上传 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="contractMoney" label="合同金额" align="center">
                            </el-table-column>
                            <el-table-column prop="payMoney" label="支付金额" align="center">
                            </el-table-column>
                            <el-table-column prop="type" label="类别" align="center">
                            </el-table-column>
                            <el-table-column prop="textCompany" label="检测单位" align="center">
                            </el-table-column>
                            <!--    <el-table-column
                            prop="tester"
                            label="检测人"
                            align="center"
                        >
                        </el-table-column> -->
                            <el-table-column label="项目状态" align="center">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.state | stateFilter(scope.row.state)"
                                        @click.stop="statusCondition(scope.row.id)" style="cursor: pointer;">{{
                                            scope.row.state | statusFilter(scope.row.examineTaskMap != null ?
                                        scope.row.examineTaskMap.role_id :"")}}</el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <Page :total="total1" :pageNum="current" :pageSize="size" @pageChange="pageChange1" />
                </el-tab-pane>
                <el-tab-pane label="未开始" name="3">
                    <div class="condition">
                        <el-form :inline="true" :model="formInline" size='mini' class="demo-form-inline">
                            <el-form-item label="档案编号：">
                                <el-input v-model="formInline.number" placeholder="请填写档案编号"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="发票信息：">
                                <el-input
                                    v-model="formInline.invoice"
                                    placeholder="请填写发票信息"
                                ></el-input>
                            </el-form-item> -->
                            <el-form-item label="单位名称：">
                                <el-input v-model="formInline.company_name" placeholder="请填写单位名称"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称：">
                                <el-input v-model="formInline.project_name" placeholder="请填写项目名称"></el-input>
                            </el-form-item>
                            <el-form-item label="类别：">
                                <el-select v-model="formInline.type" placeholder="请选择">
                                    <el-option label="民用" value="民用"></el-option>
                                    <el-option label="危化" value="危化"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="测试单位：">
                                <el-input v-model="formInline.textCompany" placeholder="请填写测试单位"></el-input>
                            </el-form-item>
                            <!--  <el-form-item label="检测人：">
                                <el-input
                                    v-model="formInline.tester"
                                    placeholder="请填写检测人"
                                ></el-input>
                            </el-form-item> -->
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="onSubmit2">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="footer-table">
                        <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" border
                            style="width: 100%;height:100%;overflow-y: auto;">
                            <el-table-column type="expand" label="详细信息" width="80">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <el-form-item label="制作人：" v-if="props.row.makeUserMap">
                                            <span>{{ props.row.makeUserMap.true_name || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="合同编号：">
                                            <span>{{ props.row.contractNumber || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="合同金额：">
                                            <span>{{ props.row.contractMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="支付金额：">
                                            <span>{{ props.row.payMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="开票时间：">
                                            <span>{{ props.row.invoiceTime || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="入账时间：">
                                            <span>{{ props.row.arrivalTime || '-' }}</span>
                                        </el-form-item>

                                    </el-form>
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <el-form-item label="入账金额：">
                                            <span>{{ props.row.arrivalMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="预拨时间：">
                                            <span>{{ props.row.advanceTime || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="预拨金额：">
                                            <span>{{ props.row.advanceMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="开票金额：">
                                            <span>{{ props.row.invoiceMoney || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="发票号码：">
                                            <span>{{ props.row.invoiceNumber || '-' }}</span>
                                        </el-form-item>
                                        <el-form-item label="欠款金额：">
                                            <span>{{ props.row.arrearsMoney || '-' }}</span>
                                        </el-form-item>
                                    </el-form>
                                    <el-form label-position="left" inline class="demo-table-expand hide">
                                        <!--  <el-form-item label="检测报告下载：">
                                            <span
                                                @click="Download(props.row.testImg)"
                                                style="cursor:pointer;"
                                            >{{ props.row.testImg!=null ? props.row.testImg: '-'}}</span>
                                        </el-form-item> -->
                                        <el-form-item label="检测报告痕迹版下载：">
                                            <span @click="Download(props.row.testMarkImg)" style="cursor:pointer;">{{
                                                props.row.testMarkImg != null ? '(' +props.row.testMarkImg.split('(')[1]:
                                                '-'}}</span>
                                        </el-form-item>
                                        <el-form-item label="检测报告打印版下载：">
                                            <span
                                                @click="Download(props.row.testPrintImg != null ? props.row.testPrintImg.split('.')[0] + '.pdf' : '')"
                                                style="cursor:pointer;">{{ props.row.testPrintImg != null ? '(' +
                                                    props.row.testPrintImg.split('(')[1].replaceAll('.docx','.pdf'):
                                                '-'}}</span>
                                            <span @click="lookPwdShow = !lookPwdShow"
                                        v-if="props.row.testPrintImg != null"
                                        style="cursor:pointer;margin-left: 10px;">{{ lookPwdShow ? '隐藏' : '查看' }}密码</span>
                                    <span v-if="lookPwdShow">{{ ':' + props.row.lookPwd }}</span>
                                        </el-form-item>
                                        <el-form-item label="检测报告正式版下载：">
                                            <span @click="Download(props.row.testFormalImg)" style="cursor:pointer;">{{
                                                props.row.testFormalImg ? '(' +props.row.testFormalImg.split('(')[1]:
                                                '-'}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column
                            type="selection"
                            width="55"
                        >
                        </el-table-column> -->
                            <el-table-column label="档案编号" width="120" align="center">
                                <template slot-scope="scope">{{ scope.row.number }}</template>
                            </el-table-column>
                            <!-- <el-table-column
                                prop="invoice"
                                label="发票信息"
                                width="120"
                                align="center"
                            >
                            </el-table-column> -->
                            <el-table-column prop="companyName" label="委托方名称" align="center">
                            </el-table-column>
                            <el-table-column prop="projectName" label="项目名称" align="center">
                            </el-table-column>
                            <el-table-column prop="projectName" label="原始记录" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/ProjectOriginalRecord/' + imgCom(scope.row.originalRecordImg ? scope.row.originalRecordImg : '')"
                                        @click.stop="pdfSrcShow2(scope.row.originalRecordPath)"
                                        v-if="scope.row.originalRecordImg != null">
                                    </el-image>
                                    <span v-else> 未上传 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="projectName" label="合同" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/Contract/' + imgCom(scope.row.contractImg)"
                                        @click.stop="pdfSrcShow(scope.row.contractFile)" v-if="scope.row.contractImg">
                                    </el-image>
                                    <span v-else> 未上传 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="projectName" label="现场照片" align="center">
                                <template slot-scope="scope">
                                    <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover"
                                        :src="'http://140.249.209.176:8084/LightningDetection/ProjectOriginalRecord/' + imgCom(scope.row.sceneImg)"
                                        @click.stop="imgShowList(scope.row.sceneImg)" v-if="scope.row.sceneImg">
                                    </el-image>
                                    <span v-else> 未上传 </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="contractMoney" label="合同金额" align="center">
                            </el-table-column>
                            <el-table-column prop="payMoney" label="支付金额" align="center">
                            </el-table-column>
                            <el-table-column prop="type" label="类别" align="center">
                            </el-table-column>
                            <el-table-column prop="textCompany" label="检测单位" align="center">
                            </el-table-column>
                            <!--   <el-table-column
                            prop="tester"
                            label="检测人"
                            align="center"
                        >
                        </el-table-column> -->
                            <el-table-column label="项目状态" align="center">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.state | stateFilter(scope.row.state)"
                                        @click.stop="statusCondition(scope.row.id)" style="cursor: pointer;">{{
                                            scope.row.state | statusFilter(scope.row.examineTaskMap != null ?
                                        scope.row.examineTaskMap.role_id :"")}}</el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <Page :total="total2" :pageNum="current" :pageSize="size" @pageChange="pageChange2" />
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-show="pdfShow" class="pdf">
            <iframe :src="pdfSrc" frameborder="0" class="iframes"></iframe>
            <div class="close" @click.stop="pdfShow = false"> × </div>
        </div>
        <div v-show="imgShow" class="imgShow">
            <el-carousel :autoplay="false" height="1030px">
                <el-carousel-item v-for="item in imgList" :key="item">
                    <img :src="item">
                </el-carousel-item>
            </el-carousel>
            <div class="closer" @click.stop="imgShow = false"> × </div>
        </div>
        <Timeline :dilongList="dilongList" :TimeLineShow="TimeLineShow" v-on:TimeLineShowlose="TimeLineShowlose"
            v-on:docSrcShow="docSrcShow" />
    </div>
</template>
<script>
// @ is an alias to /src
import { getProject, selectProjectRecord } from "@/api/aviation";
import Page from "@/components/page/index.vue";
import Timeline from "@/components/Timeline/Index.vue";
export default {
    name: "XXX",
    data() {
        return {
            tableData: [],
            tableData1: [],
            tableData2: [],
            total: 7,
            total1: 7,
            total2: 7,
            current: 1,
            size: 10,
            activeName: "2",
            formInline: {
                number: "" /* 档案编号 */,
                invoice: "" /* 发票信息 */,
                company_name: "" /* 单位名称*/,
                project_name: "" /* 项目名称 */,
                type: "" /* 类型 */,
                textCompany: "" /* 检测单位 */,
                tester: "" /* 检测人 */,
            },
            TimeLineShow: false,
            dilongList: "",
            pdfSrc: "",
            pdfShow: false,
            imgShow: false,
            imgList: [],
            lookPwdShow: false,
        };
    },
    computed: {
        sessionName() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.name;
        },
    },
    created() {
        this.getProject(16);
        var cor = "5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,24,25";
        this.getProject(cor);
        this.getProject(4);
        this.activeName = this.$route.query.userId + "";
    },
    components: {
        Page,
        Timeline,
    },
    methods: {
        Goback() {
            this.$router.go(-1);
        },
        getProject(count, current) {
            let regionId = JSON.parse(sessionStorage.getItem("records"));
            let parameter = {
                size: this.size,
                current: current ? current : this.current,
                projectState: count,
                number: this.formInline.number,
                invoice: this.formInline.invoice,
                company_name: this.formInline.company_name,
                type: this.formInline.type,
                textCompany: this.formInline.textCompany,
                aboutUser: regionId.id,
                regionId: regionId.regionIdMap.id,
                roleId: regionId.roleIdMap.id,
                company: regionId.company,
            };
            if (this.sessionName == "管理员") {
                parameter = {
                    size: this.size,
                    current: current ? current : this.current,
                    projectState: count,
                    number: this.formInline.number,
                    invoice: this.formInline.invoice,
                    company_name: this.formInline.company_name,
                    type: this.formInline.type,
                    textCompany: this.formInline.textCompany,
                    regionId: regionId.regionIdMap.id,
                    roleId: regionId.roleIdMap.id,
                    company: regionId.company,
                };
            }
            getProject(parameter).then((res) => {
                if (count == 16) {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                } else if (count == 4) {
                    this.tableData1 = res.data.records;
                    this.total2 = res.data.total;
                } else {
                    this.tableData2 = res.data.records;
                    this.total1 = res.data.total;
                }
            });
        },
        onSubmit() {
            this.getProject(16, 1);
        },
        onSubmit1() {
            var cor = "4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21";
            this.getProject(cor, 1);
        },
        onSubmit2() {
            this.getProject(4, 1);
        },
        pageChange(page) {
            this.size = page._pageSize;
            this.current = page._currentPage;
            this.getProject(16);
        },
        pageChange1(page) {
            this.size = page._pageSize;
            this.current = page._currentPage;
            var cor = "4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21";
            this.getProject(cor);
        },
        pageChange2(page) {
            this.size = page._pageSize;
            this.current = page._currentPage;
            this.getProject(4);
        },
        imgCom(row) {
            if (row) {
                let arr = row.split(",");
                if (arr.length > 0) {
                    return arr[0];
                } else {
                    return arr;
                }
            }
        },
        pdfSrcShow(file) {
            this.pdfSrc =
                "http://140.249.209.176:8084/LightningDetection/Contract/" +
                file;
            setTimeout(() => {
                this.pdfShow = true;
            }, 1500);
        },
        /* 原始记录 */
        pdfSrcShow2(file) {
            this.pdfSrc =
                "http://140.249.209.176:8084/LightningDetection/ProjectOriginalRecord/" +
                file;
            setTimeout(() => {
                this.pdfShow = true;
            }, 1500);
        },
        docSrcShow(file) {
            let arr = file.replaceAll("docx", "pdf");
            this.pdfSrc =
                "http://140.249.209.176:8084/LightningDetection/ProjectTestRecord/" +
                arr;
            setTimeout(() => {
                this.pdfShow = true;
            }, 1500);
        },
        imgShowList(row) {
            let arr = row.split(",");
            this.imgList = arr
                .map((item) => {
                    return (
                        "http://140.249.209.176:8084/LightningDetection/ProjectOriginalRecord/" +
                        item
                    );
                })
                .join(",")
                .split(",");
            setTimeout(() => {
                this.imgShow = true;
            }, 1500);
        },
        Download(testImg) {
            window.open(
                "http://140.249.209.176:8084/LightningDetection/ProjectTestRecord/" +
                testImg
            );
        },
        // 项目状态
        async statusCondition(row) {
            const { data: res } = await selectProjectRecord({
                id: row,
            });
            if (res.state == 200 && res.stateStr == "成功") {
                this.dilongList = res.records;
                this.TimeLineShow = true;
            }
        },
        TimeLineShowlose(val) {
            this.TimeLineShow = val;
        },
    },
};
</script>
<style lang="scss" scoped>
.table_class {
    height: 100%;

    .header {
        display: flex;
        justify-content: space-between;
        border: 1px solid #e4e7ed;
        border-bottom: none;
        height: 40px;
        line-height: 40px;
        background: #fff;
        padding: 0px 10px;
        font-size: 14px;

        div {
            cursor: pointer;
        }
    }

    ::v-deep.el-tabs__content {
        height: calc(100% - 40px);
    }

    ::v-deep.el-tab-pane {
        height: 100%;
        overflow-y: auto;
    }

    .footer {
        height: calc(100% - 40px);

        ::v-deep.el-tabs {
            height: 100%;
        }

        .condition {
            height: 50px;
            line-height: 40px;
            font-size: 16px;
            background: #fff;
            padding: 0 1%;
            margin-bottom: 7px;

            .el-form {
                width: 100%;

                .el-form-item {
                    margin-bottom: 0;
                }

                ::v-deep .el-form-item:nth-child(7) {
                    padding-left: 13px;
                }

                ::v-deep .el-form-item__content {
                    line-height: 40px;
                }
            }
        }

        ::v-deep.pagination {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%);
        }

        .footer-table {
            height: calc(100% - 122px);

            .hide {
                width: 100%;
                height: 20px;
                display: flex;
                margin-bottom: 20px;
            }

            ::v-deep .el-form--inline .el-form-item {
                margin-right: 48px;
                color: #2788ee;
                font-weight: 400;
            }

            ::v-deep .el-form-item__label {
                color: #2788ee;
                font-weight: bolder;
                margin-right: -15px;
            }
        }
    }

    .pdf {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .iframes {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9998;
    }

    .close {
        width: 30px;
        height: 30px;
        background: #323639;
        position: absolute;
        right: 12%;
        top: 9px;
        cursor: pointer;
        font-size: 34px;
        color: #fff;
        z-index: 9999;
    }

    ::v-deep.gonggao {
        height: 30%;
    }

    .imgShow {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.9);

        img {
            position: absolute;
            left: 50%;
            top: 10%;
            width: 50%;
            transform: translate(-50%, -10%);
        }
    }

    .closer {
        width: 30px;
        height: 30px;
        background: #0000005e;
        position: absolute;
        right: 12%;
        top: 9px;
        cursor: pointer;
        font-size: 34px;
        color: #fff;
        z-index: 9999;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
    }
}
</style>